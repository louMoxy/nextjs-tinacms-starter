import { Header } from './Header'
import { ReactNode } from 'react'
import { Box, Text } from '@chakra-ui/layout'

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
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
