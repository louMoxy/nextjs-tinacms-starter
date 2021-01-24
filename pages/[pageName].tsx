import { Layout } from '../components/Layout'
import { Box, Text } from '@chakra-ui/layout'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
// import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha'
import { useRouter } from 'next/router'

const formOptions = {
  label: 'Page',
  fields: [{ name: 'title', component: 'text' }]
}

export default function Page (props: any) {
  // const previewURL = props.previewURL || ''
  const router = useRouter()
  if (!props.file) {
    return <p>oh nooo</p>
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const [data, form] = useGithubJsonForm(props.file, formOptions)
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
  const { slug } = params
  const fileRelativePath = `content/${slug}.json`
  if (preview) {
    try {
      const previewProps = await getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson
      })
      return {
        props: {
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          ...previewProps.props
        }
      }
    } catch (e) {
      return {
        props: {
          file: {
            githubDatUrl: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}/${fileRelativePath}`,
            fileRelativePath,
            data: null
          }
        }
      }
    }
  }

  const content = (await import(`../content/${slug}.json`)).default

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      ...global,
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
      const slug = file.replace('.json', '').replace(contentDir, '').replace('/', '')
      return { params: { slug } }
    })
  return {
    fallback: true,
    paths
  }
}
