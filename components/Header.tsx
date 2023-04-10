import clsx from 'clsx'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MenuButton from './MenuButton'

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

function useToggleMenu() {
  const [menuShow, setMenuShow] = useState(false)
  const onMenuToggle = () => {
    setMenuShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }
  return [menuShow, onMenuToggle] as const
}

const Header = () => {
  const router = useRouter()

  const isTop = useIsScrollTop()
  const [menuShow, onMenuToggle] = useToggleMenu()

  return (
    <>
      <header
        className={`sticky top-0 z-10 h-16 bg-white bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-gray-900 dark:bg-opacity-50 ${
          isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800 '
        }`}
        style={{
          paddingTop: '0.60rem',
          paddingBottom: '0.60rem',
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
          <div className="flex items-center sm:hidden">
            <MenuButton onClick={onMenuToggle} isOpened={menuShow} />
          </div>
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-0 sm:mr-3">
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

          <nav className="flex items-center text-base leading-5">
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
          </nav>
        </div>
      </header>

      {/* Mobile side menu */}
      <div
        className={`fixed right-0 z-20 h-screen w-full transform bg-white duration-500 ease-in-out dark:bg-black sm:hidden ${
          menuShow ? 'translate-x-0' : ' -translate-x-full'
        } bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-opacity-30`}
      >
        <nav className="mt-8 h-full space-y-8">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12">
              <Link
                href={link.href}
                title={link.title}
                className="text-xl font-semibold leading-8 tracking-wide text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                onClick={onMenuToggle}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
export default Header
