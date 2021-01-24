import { GetStaticProps, GetStaticPaths } from 'next'
import { useGithubMarkdownForm } from 'react-tinacms-github'
import { fileToUrl } from '../../utils/fileToUrl'
import Error from 'next/error'
import { getMarkdownPreviewProps } from '../../utils/getMarkdownFile'
const fg = require('fast-glob')

function BlogTemplate ({ file, siteConfig, preview }) {
  // fallback workaround
  if (!file) {
    return <Error statusCode={404} />
  }

  // Registers Tina Form
  const [data, form] = useGithubMarkdownForm(file, formOptions)

  console.log(data)
  return (
    <p>yay</p>
  )
}

export default BlogTemplate

/*
 ** DATA FETCHING --------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  ...ctx
}) {
  const { slug } = ctx.params
  // TODO - move to readFile

  const previewProps = await getMarkdownPreviewProps(
    `content/blog/${slug}.md`,
    preview,
    previewData
  )

  if ((previewProps.props.error?.status || '') === 'ENOENT') {
    return { props: {} } // will render the 404 error
  }

  return {
    props: { ...previewProps.props }
  }
}

export const getStaticPaths: GetStaticPaths = async function () {
  const blogs = await fg('./content/blog/**/*.md')
  return {
    paths: blogs.map(file => {
      const slug = fileToUrl(file, 'blog')
      return { params: { slug } }
    }),
    fallback: true
  }
}

/*
 ** TINA FORM CONFIG --------------------------------------------------
 */

const formOptions = {
  label: 'Blog Post',
  fields: [
    {
      label: 'Title',
      name: 'frontmatter.title',
      component: 'text'
    },
    {
      label: 'Author',
      name: 'frontmatter.author',
      component: 'text'
    },
    /*
     ** TODO: add this back in once
     ** draft functionality works again
     */
    // {
    //   name: 'frontmatter.draft',
    //   component: 'toggle',
    //   label: 'Draft',
    // },
    {
      label: 'Date Posted',
      name: 'frontmatter.date',
      component: 'date',
      dateFormat: 'MMMM DD YYYY',
      timeFormat: false
    },
    {
      label: 'Blog Body',
      name: 'markdownBody',
      component: 'markdown'
    }
  ]
}
