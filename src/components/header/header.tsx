import Logo from '@/components/logo'
import SwitchDarkMode2 from '@/components/switch-dark-mode2'
import clsx from 'clsx'
import { FC } from 'react'
import { HeaderNavigation } from './navigation/header-navigation'

interface Props {
  hasBorderBottom?: boolean
  className?: string
}

const Header: FC<Props> = async ({ hasBorderBottom = true, className }) => {
  return (
    <div className={clsx('relative', className)}>
      <div
        className={clsx(
          'relative border-border bg-background',
          hasBorderBottom && 'border-b',
          !hasBorderBottom && 'has-[.header-popover-full-panel]:border-b'
        )}
      >
        <div className="container flex h-20 justify-between">
          <div className="flex items-center lg:flex-1">
            <Logo />
          </div>

          <div className="mx-4 flex flex-2">
            <HeaderNavigation />
          </div>

          <div className="flex flex-1 items-center justify-end">
            <SwitchDarkMode2 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
