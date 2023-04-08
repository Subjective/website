import React from 'react'
import Link from 'next/link'
import useActiveAnchor from 'hooks/useActiveAnchor'
import { Toc } from 'pliny/mdx-plugins/remark-toc-headings'

export interface Heading {
  text: string
  anchor: string
  depth: number
}

interface TOCProps {
  toc: Toc
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
}

const TableOfContents = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  exclude = '',
}: TOCProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const anchors = React.useMemo(() => filteredToc.map((toc) => toc.url.slice(1)), [filteredToc])
  const activeAnchor = useActiveAnchor(anchors)

  const activeStyle = 'text-gray-900 dark:text-gray-100'
  const normalStyle = 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'

  if (!filteredToc.length) return null
  return (
    <>
      <ul className={'text-dark-400 py-8 text-sm '}>
        <h2 className={'mb-2 text-sm font-bold uppercase tracking-wider text-primary-500'}>
          Table of Contents
        </h2>
        {filteredToc.map(({ value, url, depth }) => {
          return (
            <li key={url} className={`${depth >= indentDepth && 'ml-6'}`}>
              <Link
                href={{
                  hash: url,
                }}
                className={`${
                  activeAnchor === url.slice(1) ? activeStyle : normalStyle
                } block py-1`}
              >
                {value}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TableOfContents
