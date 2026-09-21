# Lovely Homestay

Website for Lovely Homestay in Guwahati, Assam, built with Next.js, TypeScript and Tailwind CSS.

## Getting started

Install the existing dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Search Console

The site supports Google's HTML tag verification without storing a fake token in source control. Copy `.env.local.example` to `.env.local`, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the verification content supplied by Google Search Console, and redeploy. Leave it empty until Google provides the real value.

After deployment, submit `https://lovelyhomestay.net/sitemap.xml` in Search Console and request indexing for the canonical homepage. Search visibility and rankings still depend on Google crawling and evaluating the deployed site.

## Validation

```bash
npm run lint
npm run build
npm run check:links
```
