import Image from './Image'
import Link from './Link'
import ClickableCard from './ClickableCard'
import ScrollAnimationWrapper from './ScrollAnimationWrapper'
import projectsData from '@/data/projectsData'

type ProjectDataType = (typeof projectsData)[0]

export interface ProjectCardProps {
  project: ProjectDataType
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, imgSrc, href, repo, builtWith } = project

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
        }  group overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 duration-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600`}
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
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
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
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
              onClick={(e) => e.stopPropagation()}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </ClickableCard>
    </ScrollAnimationWrapper>
  )
}

export default ProjectCard
