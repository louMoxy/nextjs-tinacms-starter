import { Layout } from '../components/Layout'
import { Box, Text } from '@chakra-ui/layout'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'

interface Props {
  file: {
    data: {
      title: string
    }
  }
}
export default function Home ({ file }: Props) {
  const data = file.data
  return (
    <Layout>
      <Box maxW='xl' justifyContent='center' m='auto' p='3'>
        <Text>{data.title}</Text>
      </Box>
    </Layout>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default
      }
    }
  }
}
