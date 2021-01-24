import slugify from 'slugify'
import { MarkdownCreatorPlugin } from './MarkdownCreatorPlugin'
import { fileToUrl } from './fileToUrl'

export const BlogPostCreatorPlugin = new MarkdownCreatorPlugin({
  label: 'New Blog Post',
  filename: form => {
    const slug = slugify(form.title)
    return `content/blog/${slug}.md`
  },
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      placeholder: 'My New Post',
      description: 'The title of the new blog post.'
    },
    {
      label: 'Date',
      name: 'date',
      component: 'date',
      description: 'The default will be today'
    },
    {
      label: 'Author',
      description: 'Who wrote this, yo?',
      name: 'author',
      component: 'text'
    }
  ],
  frontmatter: postInfo => ({
    title: postInfo.title,
    date: postInfo.date ? postInfo.date : new Date(),
    author: postInfo.author ? postInfo.author : 'Jane Doe'
  }),
  body: () => 'New post, who dis?',
  afterCreate: response => {
    const url = fileToUrl(response.content.path.split('content')[1], 'blog')

    window.location.href = `/blog/${url}`
  }
})
