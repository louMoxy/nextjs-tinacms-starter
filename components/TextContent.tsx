import { BlocksControls } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import { Box, GridItem } from '@chakra-ui/layout'
import { Property } from 'csstype'
import { widths, widthField, paddingField } from './componentUtils'

interface Props {
  index: number
  data: {
    html: string,
    bgColor?: string,
    textColor?: string,
    textAlign?: Property.TextAlign
    padding?: string,
    width?: string
  }
}

export const TextContent = ({ index, data }: Props) => {
  const { html, bgColor = 'transparent', textColor, textAlign = 'left', padding = '3', width = widths.container.name } = data

  return (
    <BlocksControls index={index} insetControls>
      <GridItem bg={bgColor} gridColumn={widths[width].val}>
        <Box maxW='100%' m='auto' p={padding} textColor={textColor} textAlign={textAlign}>
          <InlineWysiwyg
            name="rawMarkdownBody"
            imageProps={{
              parse: media => `/${media.filename}`,
              uploadDir: () => '/public/'
            }}
          >
            {data.html && <div
              dangerouslySetInnerHTML={{
                __html: html
              }}
            />}
          </InlineWysiwyg>
        </Box>
      </GridItem>
    </BlocksControls>
  )
}

export const TextContentTemplate = {
  label: 'Text and Image content',
  defaultItem: {
    html: '<p>Add text here</p>'
  },
  fields: [
    widthField,
    paddingField,
    {
      component: 'color',
      name: 'bgColor',
      label: 'Background Colour'
    },
    {
      component: 'color',
      name: 'textColor',
      label: 'Text Colour'
    },
    {
      component: 'select',
      name: 'textAlign',
      label: 'Text Alignment',
      options: ['Left', 'center', 'right']
    }
  ]
}
