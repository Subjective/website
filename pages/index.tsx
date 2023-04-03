import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import Greeting from '@/components/homepage/Greeting'
import TypedBio from '@/components/homepage/TypedBio'
import Particles from 'react-tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper'

const MAX_DISPLAY = 5

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

function scrollToRef(ref: React.MutableRefObject<HTMLElement>) {
  const elementId = ref.current?.id
  window.location.hash = `#${elementId}`
  const headerHeight = document.querySelector('header').offsetHeight
  const scrollPosition = ref.current.offsetTop - headerHeight * 2
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
  })
}

function useScrollToTopOrBottom(
  ref: React.RefObject<HTMLElement>,
  jumpRef?: React.RefObject<HTMLElement>,
  timeout = 1000
) {
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        const element = ref.current

        if (element) {
          const elementTop = element.getBoundingClientRect().top
          const threshold = window.innerHeight / 2

          if (elementTop >= threshold && elementTop <= window.innerHeight) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
            history.pushState('', document.title, window.location.pathname + window.location.search)
          } else if (elementTop >= 0 && elementTop < threshold) {
            if (jumpRef) {
              scrollToRef(jumpRef)
            } else {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              })
            }
          }
        }
      }, timeout)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [ref, jumpRef, timeout])
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine)

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container)
  }, [])

  const postsRef = useRef<HTMLHeadingElement>()
  const buttonRef = useRef<HTMLButtonElement>()
  useScrollToTopOrBottom(buttonRef, postsRef, 600)

  const BlogListItem = ({ slug, title, tags, summary, date, siteMetadata }) => {
    const router = useRouter()

    return (
      <ScrollAnimationWrapper>
        <li>
          <article>
            <div
              className="clickable mb-10 space-y-2 rounded-2xl bg-gray-100/50 px-8 py-10 backdrop-blur-sm duration-300 dark:bg-gray-800/50 sm:bg-transparent sm:backdrop-blur-none sm:hover:bg-gray-100/50 sm:hover:backdrop-blur-sm sm:dark:bg-transparent sm:dark:hover:bg-gray-800/50 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0"
              onClick={() => {
                router.push(`/blog/${slug}`)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(`/blog/${slug}`)
                }
              }}
              role="link"
              tabIndex={0}
            >
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </dd>
              </dl>
              <div className="space-y-5 xl:col-span-3">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-gray-900 dark:text-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                </div>
                <div className="text-base font-medium leading-6">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Read "${title}"`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </li>
      </ScrollAnimationWrapper>
    )
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div style={{ position: 'absolute', width: '100%', left: '0', height: '80vh' }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: ['push'],
                },
                onHover: {
                  enable: false,
                  mode: ['bubble', 'connect'],
                },
                resize: true,
              },
              modes: {
                connect: {
                  links: {
                    opacity: 0.9,
                  },
                  distance: 200,
                  radius: 200,
                },
                bubble: {
                  size: 10,
                  duration: 0.5,
                  distance: 50,
                },
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: '#808080',
              },
              links: {
                color: '#808080',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 40,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      <div
        className="flex h-screen flex-col items-center justify-center"
        style={{ position: 'relative' }}
      >
        <div className="space-y-2 pb-8 pt-6 md:space-y-5" style={{ minHeight: '60vh' }}>
          <Greeting />
          <TypedBio />
        </div>
        <button
          ref={buttonRef}
          style={{
            top: '80%',
          }}
          aria-hidden={'true'}
          className={'focus-invisible absolute animate-bounce duration-500 hover:opacity-50'}
          onClick={(e) => {
            e.preventDefault()
            scrollToRef(postsRef)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="auto"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <path
                d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                style={{
                  stroke: 'none',
                  strokeWidth: 1,
                  strokeDasharray: 'none',
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                }}
              />
            </g>
          </svg>
        </button>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
            id="latest"
            ref={postsRef}
            style={{ position: 'relative' }}
          >
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="pt-8" style={{ position: 'relative' }}>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <BlogListItem key={slug} {...{ slug, title, tags, summary, date, siteMetadata }} />
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-4 text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
