// Fails the build when an internal link points at a route that was never
// prerendered. Needed because `dynamicParams = false` turns those into real
// 404s instead of the old silent fallback to listing [0].
//
// Scans the generated HTML rather than src/, so links built from data
// (href={`/authors/${host.handle}`}) are checked too.
//
// Usage: npm run build && npm run check:links
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const APP_DIR = '.next/server/app'

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

let files
try {
  files = walk(APP_DIR).filter((f) => f.endsWith('.html'))
} catch {
  console.error(`${APP_DIR} not found — run \`npm run build\` first.`)
  process.exit(1)
}

const routeFromFile = (file) => file.slice(APP_DIR.length, -'.html'.length).replaceAll('\\', '/') || '/'
const routes = new Set(files.map(routeFromFile))
routes.add('/')

// Links to a prerendered page, an anchor, or anything off-site are all fine.
const dead = new Map()
for (const file of files) {
  const page = routeFromFile(file)
  for (const [, href] of readFileSync(file, 'utf8').matchAll(/href="(\/[^"#]*)"/g)) {
    const path = href.split('?')[0].replace(/\/$/, '') || '/'
    // Skip assets (/icon.svg, /robots.txt …) — they are routes, just not HTML.
    if (path.startsWith('/_next') || /\.[a-z0-9]+$/i.test(path) || routes.has(path)) continue
    if (!dead.has(path)) dead.set(path, new Set())
    dead.get(path).add(page)
  }
}

if (!dead.size) {
  console.log(`✓ every internal link resolves (${routes.size} prerendered routes checked)`)
  process.exit(0)
}

console.error(`✗ ${dead.size} internal link(s) point at routes that will 404:\n`)
for (const [path, pages] of [...dead].sort()) {
  const found = [...pages].sort()
  const shown = found.slice(0, 3).join(', ')
  console.error(`  ${path}\n      linked from: ${shown}${found.length > 3 ? ` (+${found.length - 3} more)` : ''}`)
}
process.exit(1)
