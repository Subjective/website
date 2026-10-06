import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components.js'
import { coreContent } from 'pliny/utils/contentlayer.js'
import { MDXComponents, Wrapper } from '@/components/MDXComponents'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return { props: { author } }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Wrapper layout={author.layout || DEFAULT_LAYOUT} content={coreContent(author)}>
      <MDXLayoutRenderer code={author.body.code} components={MDXComponents} />
    </Wrapper>
  )
}
