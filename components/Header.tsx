import clsx from 'clsx'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/router'
const Header = () => {
  let router = useRouter()
  return (
    // <header className="flex justify-between items-center py-10">
    // <header className="flex sticky justify-between items-center py-10 supports-backdrop-blur:bg-white/95 bg-white/75 backdrop-blur dark:bg-dark/75">
    <header className="flex sticky top-0 z-40 justify-between items-center py-5 bg-white/75 backdrop-blur dark:bg-gray-900/75">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex justify-between items-center">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden space-x-2 sm:block">
          {headerNavLinks.map((link) => {
            let className = clsx(
              'inline-block rounded-2xl font-medium text-gray-900 dark:text-gray-100 py-1 px-2 sm:py-2 sm:px-3',
              router.pathname === link.href
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            )
            return (
              <Link key={link.title} href={link.href}>
                <span className={className}>{link.title}</span>
              </Link>
            )
          })}
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}
export default Header
