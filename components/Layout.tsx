import { Header } from './Header'
import { ReactNode } from 'react'
import { usePlugin } from 'tinacms'
import { Box, Text } from '@chakra-ui/layout'
import { useCreatePage } from '../utils/useCreatePage'
import { BlogPostCreatorPlugin } from '../utils/BlogPostCreator'

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  useCreatePage()
  usePlugin(BlogPostCreatorPlugin)
  return (
    <>
      <Header/>
      {children}
      <footer>
        <Box maxW='xl' justifyContent='center' m='auto' p='3'>
          <Text fontSize="xs" >Copyright footer text</Text>
        </Box>
      </footer>
    </>
  )
}
