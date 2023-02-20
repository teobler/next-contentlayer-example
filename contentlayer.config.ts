import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
  },
}))

export const Other = defineDocumentType(() => ({
  name: "Other",
  filePathPattern: `public/*.md`,
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(".md", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: ".",
  contentDirInclude: ["posts", "public"],
  documentTypes: [Post, Other],
})
