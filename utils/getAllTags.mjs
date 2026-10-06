import { slug } from 'github-slugger'

/** @returns {Promise<Record<string, number>>} */
export async function getAllTags(allBlogs) {
  const tagCount = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  return tagCount
}
