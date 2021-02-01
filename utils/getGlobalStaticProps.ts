import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'

export const getGlobalStaticProps = async (preview, previewData) => {
  const fileRelativePath = 'content/global.json'
  if (preview) {
    const global = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson
      })
    ).props

    return {
      global
    }
  }

  return {
    global: {
      data: (await import('../content/global.json')).default,
      fileRelativePath
    }
  }
}
