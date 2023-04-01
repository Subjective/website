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

const Header = ({ onToggleNav }: { onToggleNav: () => void }) => {
  const router = useRouter()

  const isTop = useIsScrollTop()
  const [menuShow, onMenuToggle] = useToggleMenu()

  return (
    <>
      <header
        className={`sticky top-0 z-10 h-16 bg-white bg-opacity-50 py-3 backdrop-blur-lg backdrop-saturate-150 backdrop-filter firefox:bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 dark:firefox:bg-opacity-50 ${isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800 '
          }`}
      >
        {/* <header */}
        {/*   className={`sticky top-0 z-20 flex w-full items-center justify-between py-4  ${isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800' */}
        {/*     } firefox:bg-opacity-100 dark:firefox:bg-opacity-100 bg-white bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-black dark:bg-opacity-30`} */}
        {/* > */}
        <div className="flex justify-between items-center px-3 mx-auto max-w-3xl xl:px-0 xl:max-w-5xl">
          <div className="flex items-center sm:hidden">
            <MenuButton onClick={onMenuToggle} isOpened={menuShow} />
          </div>
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex justify-between items-center">
                <div className="mr-0 sm:mr-3">
                  <Logo className="" />
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
        className={`fixed right-0 z-20 h-screen w-full transform bg-white duration-500 ease-in-out dark:bg-black sm:hidden ${menuShow ? 'translate-x-0' : ' -translate-x-full'
          } bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter firefox:bg-opacity-100 dark:bg-opacity-30 dark:firefox:bg-opacity-100`}
      >
        <nav className="mt-8 space-y-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12">
              <Link
                href={link.href}
                title={link.title}
                className="text-xl font-semibold tracking-wide leading-8 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
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
