import Link from 'next/link'
import { useRouter } from 'next/router'
import { kebabCase } from 'pliny/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const router = useRouter()

  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      onClick={(e) => {
        e.stopPropagation()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          router.push(`/tags/${kebabCase(text)}`)
        }
      }}
      role="link"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
