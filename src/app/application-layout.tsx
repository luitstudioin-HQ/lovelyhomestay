import Aside from '@/components/aside'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import Footer3 from '@/components/footer3'
import HamburgerBtnMenu from '@/components/header/hamburger-btn-menu'
import Header from '@/components/header/header'
import Logo from '@/components/logo'
import clsx from 'clsx'
import 'rc-slider/assets/index.css'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  header?: ReactNode
  isStickyHeader?: boolean
  headerClassName?: string
}

const ApplicationLayout: React.FC<Props> = ({ children, header, isStickyHeader, headerClassName }) => {
  return (
    <Aside.Provider>
      {/* Desktop Header - Will be hidden on mobile devices  */}
      <div className={clsx('z-20 hidden lg:block', isStickyHeader ? 'sticky top-0' : 'relative', headerClassName)}>
        {header ? header : <Header hasBorderBottom={false} />}
      </div>
      {/* Compact mobile header */}
      <div className="sticky top-0 z-40 bg-background/90 py-3 backdrop-blur-md lg:hidden">
        <div className="container">
          <div className="flex min-h-14 items-center justify-between rounded-full border border-border bg-background px-3 shadow-sm">
            <Logo className="text-lg!" />
            <HamburgerBtnMenu buttonColor="white" buttonClassName="shadow-none!" />
          </div>
        </div>
      </div>
      {/*  */}
      {children}
      {/* Chose footer style here!!!! */}
      <Footer3 /> {/* <Footer /> or <Footer2 /> or <Footer3 /> or <Footer4 />*/}
      {/*  */}
      <AsideSidebarNavigation />
    </Aside.Provider>
  )
}

export { ApplicationLayout }
