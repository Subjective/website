import clsx from 'clsx'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/router'

const Header = ({ onToggleNav }: { onToggleNav: () => void }) => {
  const router = useRouter()
  return (
    <header className="flex sticky top-0 z-10 justify-between items-center py-10 h-16 bg-white/75 backdrop-blur-lg dark:bg-gray-900/75">
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
            const className = clsx(
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
        {/* <MobileNav /> */}
        <button
          className="mr-1 ml-2 w-8 h-8 rounded sm:hidden"
          type="button"
          aria-label="Toggle Menu"
          onClick={onToggleNav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-gray-900 dark:text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
export default Header
