import Link from 'next/link'

export interface GithubRepository {
  stargazerCount: number
  description: string
  homepageUrl: string
  languages: {
    color: string
    name: string
  }[]
  name: string
  nameWithOwner: string
  url: string
  forkCount: number
  repositoryTopics: string[]
}

export function GithubRepo({ repo }: { repo: GithubRepository }) {
  const mainLanguage = repo.languages[0]
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: mainLanguage.color }}
          />
          <span>{mainLanguage.name}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M12 .25a.75.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.168 6.811a.751.751 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.328.668A.75.75 0 0 1 12 .25Zm0 2.445L9.44 7.882a.75.75 0 0 1-.565.41l-5.725.832 4.143 4.038a.748.748 0 0 1 .215.664l-.978 5.702 5.121-2.692a.75.75 0 0 1 .698 0l5.12 2.692-.977-5.702a.748.748 0 0 1 .215-.664l4.143-4.038-5.725-.831a.75.75 0 0 1-.565-.41L12 2.694Z"></path>
          </svg>
          <span>{repo.stargazerCount}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M8.75 19.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM15 4.75a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Zm-12.5 0a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM5.75 6.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 5.75 6.5ZM12 21a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 12 21Zm6.25-14.5a1.75 1.75 0 1 0-.001-3.501A1.75 1.75 0 0 0 18.25 6.5Z"></path>
            <path d="M6.5 7.75v1A2.25 2.25 0 0 0 8.75 11h6.5a2.25 2.25 0 0 0 2.25-2.25v-1H19v1a3.75 3.75 0 0 1-3.75 3.75h-6.5A3.75 3.75 0 0 1 5 8.75v-1Z"></path>
            <path d="M11.25 16.25v-5h1.5v5h-1.5Z"></path>
          </svg>
          <span>{repo.forkCount}</span>
        </div>
      </div>
      <div className="flex items-center space-x-1.5">
        {repo.homepageUrl && (
          <>
            <Link
              href={repo.homepageUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"></path>
              </svg>
            </Link>
            <span className="text-gray-400 dark:text-gray-500">|</span>
          </>
        )}
        <Link
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1"
          onClick={(e) => e.stopPropagation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 45 16"
            className="h-4"
            fill="currentColor"
          >
            <path d="M8.81 7.35v5.74c0 .04-.01.11-.06.13 0 0-1.25.89-3.31.89-2.49 0-5.44-.78-5.44-5.92S2.58 1.99 5.1 2c2.18 0 3.06.49 3.2.58.04.05.06.09.06.14L7.94 4.5c0 .09-.09.2-.2.17-.36-.11-.9-.33-2.17-.33-1.47 0-3.05.42-3.05 3.73s1.5 3.7 2.58 3.7c.92 0 1.25-.11 1.25-.11v-2.3H4.88c-.11 0-.19-.08-.19-.17V7.35c0-.09.08-.17.19-.17h3.74c.11 0 .19.08.19.17Zm35.85 2.33c0 3.43-1.11 4.41-3.05 4.41-1.64 0-2.52-.83-2.52-.83s-.04.46-.09.52c-.03.06-.08.08-.14.08h-1.48c-.1 0-.19-.08-.19-.17l.02-11.11c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v3.77s.82-.53 2.02-.53l-.01-.02c1.2 0 2.97.45 2.97 3.88ZM27.68 2.43c.09 0 .17.08.17.17v11.11c0 .09-.08.17-.17.17h-2.13c-.09 0-.17-.08-.17-.17l.02-4.75h-3.31v4.75c0 .09-.08.17-.17.17h-2.13c-.08 0-.17-.08-.17-.17V2.6c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v4.09h3.31V2.6c0-.09.08-.17.17-.17Zm8.26 3.64c.11 0 .19.08.19.17l-.02 7.47c0 .09-.06.17-.17.17H34.6c-.07 0-.14-.04-.16-.09-.03-.06-.08-.45-.08-.45s-1.13.77-2.52.77c-1.69 0-2.92-.55-2.92-2.75V6.25c0-.09.08-.17.17-.17h2.14c.09 0 .17.08.17.17V11c0 .75.22 1.09.97 1.09s1.3-.39 1.3-.39V6.26c0-.11.06-.19.17-.19Zm-17.406 5.971h.005a.177.177 0 0 1 .141.179v1.5c0 .07-.03.14-.09.16-.1.05-.74.22-1.27.22-1.16 0-2.86-.25-2.86-2.69V8.13h-1.11c-.09 0-.17-.08-.17-.19V6.58c0-.08.05-.15.13-.17.07-.01 1.16-.28 1.16-.28V3.96c0-.08.05-.13.14-.13h2.16c.09 0 .14.05.14.13v2.11h1.59c.08 0 .16.08.16.17v1.7c0 .11-.07.19-.16.19h-1.59v3.131c0 .47.27.83 1.05.83.247 0 .481-.049.574-.05ZM12.24 6.06c.09 0 .17.08.17.17v7.37c0 .18-.05.27-.25.27h-1.92c-.17 0-.3-.07-.3-.27V6.26c0-.11.08-.2.17-.2Zm29.99 3.78c0-1.81-.73-2.05-1.5-1.97-.6.04-1.08.34-1.08.34v3.52s.49.34 1.22.36c1.03.03 1.36-.34 1.36-2.25ZM11.19 2.68c.75 0 1.36.61 1.36 1.38 0 .77-.61 1.38-1.36 1.38-.77 0-1.38-.61-1.38-1.38 0-.77.61-1.38 1.38-1.38Zm7.34 9.35v.001l.01.01h-.001l-.005-.001v.001c-.009-.001-.015-.011-.024-.011Z"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}
