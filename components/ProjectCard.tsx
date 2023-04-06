import Image from './Image'
import Link from './Link'
import ClickableCard from './ClickableCard'
import ScrollAnimationWrapper from './ScrollAnimationWrapper'
import projectsData from '@/data/projectsData'
import { fetcher } from 'utils/fetcher'
import { GithubRepo, GithubRepository } from './GithubRepo'
import useSWR from 'swr'

type ProjectDataType = (typeof projectsData)[0]

export interface ProjectCardProps {
  project: ProjectDataType
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, imgSrc, url, repo, builtWith } = project
  const { data } = useSWR(`/api/github?repo=${repo}`, fetcher)
  const repository: GithubRepository = data?.repository
  const href = repository?.url || url

  return (
    <ScrollAnimationWrapper
      animateInitial={true}
      animateInitialUp={true}
      className="md max-w-[544px] p-4 md:w-1/2"
    >
      <ClickableCard
        link={href}
        className={`${
          imgSrc && 'h-full'
        }  group flex h-full flex-col overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 duration-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600`}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <div className="overflow-hidden">
                <Image
                  alt={title}
                  src={imgSrc}
                  className="group-hover:brightness-80 object-cover object-center filter duration-1000 group-hover:scale-110 md:h-36 lg:h-60"
                  width={544}
                  height={306}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </Link>
          ) : (
            <div className="overflow-hidden">
              <Image
                alt={title}
                src={imgSrc}
                className="group-hover:brightness-80 object-cover object-center filter duration-1000 group-hover:scale-110 md:h-36 lg:h-60"
                width={544}
                height={306}
              />
            </div>
          ))}
        <div className="flex grow flex-col justify-between space-y-8 p-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              {href ? (
                <Link
                  href={href}
                  aria-label={`Link to ${title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <div className="max-w-none space-y-1">
              <p className="mb-3 max-w-none text-gray-500 dark:text-gray-400">
                {description || repository?.description}
              </p>
              {builtWith && builtWith.length > 0 && (
                <div className="flex flex-wrap space-x-1.5">
                  <span className="shrink-0 text-gray-500 dark:text-gray-400">Built with:</span>
                  {builtWith?.map((tool, index) => {
                    return (
                      <span key={index} className="font-semibold text-gray-500 dark:text-gray-400">
                        {tool}
                        {index !== builtWith.length - 1 && ','}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          {repository ? (
            <GithubRepo repo={repository} />
          ) : (
            href && (
              <Link
                href={href}
                className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Link to ${title}`}
                onClick={(e) => e.stopPropagation()}
              >
                Learn more &rarr;
              </Link>
            )
          )}
        </div>
      </ClickableCard>
    </ScrollAnimationWrapper>
  )
}

export default ProjectCard
