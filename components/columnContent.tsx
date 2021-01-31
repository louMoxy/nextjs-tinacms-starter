import { Box, Flex } from '@chakra-ui/react'
import { ImageComponent } from './Image'

interface Content {
  id: number
  type: string
  width: number
  maxW?: number
  maxH?: number
  padding: string
  image?:string
  html?: string
}

interface Props {
  data: {[x: string] : any}
}

export const ColumnContent = ({ data }: Props) => {
  const bgColor: string = data.bgColor || 'transparent'
  const textColor: string = data.textColor
  const alignment: string = data.alignment || 'flex-start'
  const justify: string = data.justify || 'center'
  const content: Content[] = data.content || []
  const renderType = (type: string, image?: string, html?: string) => {
    if (type === 'Image') {
      return (
        <>
          <ImageComponent src={image} width={'100%'}/>
        </>
      )
    } else {
      return (
        html && (
          <div
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
        )
      )
    }
  }
  return (
    <Box justifyContent='center' p='3' bg={bgColor} textColor={textColor}>
      <Flex w="100%" wrap='wrap' my={8} maxW='xl' m='auto' alignItems={alignment} justifyItems={justify}>
        {content.map(({ id, type, width, maxW, maxH, padding, image, html }) => (
            <Box w={`${width}%`} key={id} flex={'1 0 auto'} maxW={maxW ? `${maxW}px` : undefined} maxH={maxH ? `${maxW}px` : undefined} p={padding}>
              {renderType(type, image, html)}
            </Box>
        ))}
      </Flex>
    </Box>
  )
}

export const ColumnContentTemplate = {
  label: 'Column Content',
  key: 'column-content-block',
  fields: [
    {
      name: 'bgColor',
      component: 'color',
      label: 'Background Color',
      colorFormat: 'hex',
      widget: 'block'
      // colors: [], // Add theme colours here
    },
    {
      name: 'textColor',
      component: 'color',
      label: 'Text Color',
      colorFormat: 'hex',
      widget: 'block'
      // colors: [], // Add theme colours here
    },
    {
      label: 'Columns content',
      name: 'content',
      component: 'group-list',
      description: 'Columns content',
      itemProps: item => ({
        key: item.id,
        label: item.type
      }),
      defaultItem: () => ({
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        type: 'WYSIWYG (text and image)',
        width: 50,
        padding: 4,
        textColor: '#00E9A3'
      }),
      fields: [
        {
          component: 'select',
          name: 'type',
          label: 'Content Type',
          description: 'Select type of content for the column',
          options: ['WYSIWYG (text and image)', 'Image']
        },
        {
          component: 'select',
          name: 'justify',
          label: 'Content Justify',
          description: 'Horizontal alignment of the column',
          options: [
            {
              value: 'flex-start',
              label: 'Left'
            },
            {
              value: 'center',
              label: 'Center'
            },
            {
              value: 'flex-end',
              label: 'Right'
            }
          ]
        },
        {
          component: 'select',
          name: 'alignment',
          label: 'Content Alignment',
          description: 'Vertical alignment of the column',
          options: [
            {
              value: 'flex-start',
              label: 'Top'
            },
            {
              value: 'center',
              label: 'Center'
            },
            {
              value: 'flex-end',
              label: 'Bottom'
            }
          ]
        },
        {
          component: 'number',
          name: 'width',
          label: 'Size of the content as a percentage across the whole width',
          description: 'Select type of content for the column',
          step: 1
        },
        {
          component: 'number',
          name: 'maxW',
          label: 'Max width in pixel',
          description: 'Leave empty to have no max width',
          step: 10
        },
        {
          component: 'number',
          name: 'maxH',
          label: 'Max height in pixel',
          description: 'Leave empty to have no max height',
          step: 10
        },
        {
          name: 'padding',
          component: 'select',
          label: 'Content padding',
          description: 'Select amount of padding for the content',
          options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96]
        },
        {
          label: 'Image',
          name: 'image',
          component: 'image',
          parse: media => `/${media.filename}`,
          uploadDir: () => '/public/'
        },
        {
          name: 'html',
          label: 'Description',
          component: 'html'
        }
      ]
    }
  ]
}
