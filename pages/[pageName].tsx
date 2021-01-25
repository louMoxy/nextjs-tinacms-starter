import { Layout } from '../components/Layout'
import { Box, Text } from '@chakra-ui/layout'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha'
import { useRouter } from 'next/router'
import { fileToUrl } from '../utils/fileToUrl'
import { getLocalFiles } from '../utils/getLocalFiles'
import { useCreatePage } from '../utils/useCreatePage'
import { useCreateBlogPage } from '../utils/useCreateBlogPage'

const formOptions = {
  label: 'Page',
  fields: [{ name: 'title', component: 'text' }]
}

interface Props {file: GitFile, allPages: string[], allBlogs: string[]}

export default function Page ({ file, allPages, allBlogs }: Props) {
  useCreatePage(allPages)
  useCreateBlogPage(allBlogs)
  const router = useRouter()
  if (!file) {
    return (
      <Layout>
        <Box maxW='xl' justifyContent='center' m='auto' p='3'>
          <Text>No file was found, please check if the build has completed</Text>
        </Box>
      </Layout>
    )
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  return (
    <Layout>
      <Box maxW='xl' justifyContent='center' m='auto' p='3'>
         <Text>{data.title}</Text>
      </Box>
    </Layout>
  )
}

// /**
//  * Fetch data with getStaticProps based on 'preview' mode
//  */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const allPages = (await getLocalFiles('content') || []).map((fileName) => fileName.replace('content/', '').replace('.json', ''))
  const allBlogs = (await getLocalFiles('content/blog') || []).map((fileName) => fileName.replace('content/blog/', '').replace('.json', ''))

  const { pageName } = params
  const fileRelativePath = `content/${pageName}.json`
  if (preview) {
    try {
      const previewProps = await getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson
      })
      return {
        props: {
          allPages,
          allBlogs,
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          ...previewProps.props
        }
      }
    } catch (e) {
      return {
        props: {
          allPages,
          allBlogs,
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          file: {
            fileRelativePath,
            data: null
          }
        }
      }
    }
  }

  const content = (await import(`../content/${pageName}.json`)).default

  return {
    props: {
      allPages,
      allBlogs,
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath,
        data: content
      }
    }
  }
}

export const getStaticPaths = async function () {
  const fg = require('fast-glob')
  const contentDir = 'content'
  const files = await fg(`${contentDir}**/*.json`)
  const paths = files
    .filter((file) => !file.endsWith('index.json'))
    .map((file) => {
      const slug = fileToUrl(file, contentDir)
      return { params: { pageName: slug } }
    })
  return {
    fallback: true,
    paths
  }
}
