import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import Greeting from '@/components/homepage/Greeting'
import TypedBio from '@/components/homepage/TypedBio'
import Particles from 'react-tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const MAX_DISPLAY = 5

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
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

  const BlogListItem = ({ slug, title, tags, summary, date, siteMetadata }) => {
    const router = useRouter()
    const { ref, inView } = useInView()
    const controls = useAnimation()

    useEffect(() => {
      if (inView) {
        controls.start('visible')
      }
    }, [controls, inView])

    const itemVariants = {
      hidden: { opacity: 0, y: 100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      },
    }

    return (
      <motion.li ref={ref} variants={itemVariants} initial="hidden" animate={controls}>
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
      </motion.li>
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
          style={{
            top: '80%',
          }}
          aria-hidden={'true'}
          className={'focus-invisible absolute animate-bounce duration-500 hover:opacity-50'}
          onClick={(e) => {
            e.preventDefault()
            window.location.hash = '#latest'
            const headerHeight = document.querySelector('header').offsetHeight
            const scrollPosition = postsRef.current.offsetTop - headerHeight * 2
            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth',
            })
          }}
        >
          <Image src="/static/images/down-arrow.webp" width={35} height={35} alt="down arrow" />
        </button>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
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
