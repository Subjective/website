import React, { ReactNode } from 'react'
import type { MDXComponents as MDXComponentMap } from 'mdx/types'
import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'

import AuthorLayout from '@/layouts/AuthorLayout'
import CustomLayout from '@/layouts/CustomLayout'
import CustomSimpleLayout from '@/layouts/CustomSimpleLayout'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'

import Image from './Image'
import CustomLink from './Link'

const layouts = { AuthorLayout, CustomLayout, CustomSimpleLayout, PostLayout, PostSimple }

interface WrapperProps {
  layout: string
  content: unknown
  children: ReactNode
  [key: string]: unknown
}

export const Wrapper = ({ layout, content, ...rest }: WrapperProps) => {
  const Layout = layouts[layout]
  return <Layout content={content} {...rest} />
}

export const MDXComponents: MDXComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
}
