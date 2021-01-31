import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'

export const getGlobalStaticProps = async (preview, previewData) => {
  if (preview) {
    const global = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'global.json',
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
      fileRelativePath: 'content/global.json'
    }
  }
}
