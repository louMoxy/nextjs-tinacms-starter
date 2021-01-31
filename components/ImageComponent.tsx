import { BlocksControls, InlineImage } from 'react-tinacms-inline'
import { GridItem } from '@chakra-ui/layout'
import { widths, widthField, paddingField } from './componentUtils'

interface Props {
  index: number
  data: {
    alt: string
    width?: string
  }
}

export const ImageComponent = ({ index, data }: Props) => {
  const { width = widths.container.name } = data
  return (
    <BlocksControls index={index} insetControls>
      <GridItem gridColumn={widths[width].val}>
        <InlineImage
          name="image"
          parse={media => `/${media.filename}`}
          uploadDir={() => '/public/'}
          alt={data.alt}
        />
      </GridItem>
    </BlocksControls>
  )
}

export const ImageComponentTemplate = {
  label: 'Text and Image content',
  fields: [
    {
      component: 'text',
      name: 'alt',
      label: 'Description about the image'
    },
    widthField,
    paddingField
  ]
}
