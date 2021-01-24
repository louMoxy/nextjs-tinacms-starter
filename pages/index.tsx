import { Layout } from '../components/Layout'
import { Box, Text } from '@chakra-ui/layout'

export default function Home () {
  return (
    <Layout>
      <Box maxW='xl' justifyContent='center' m='auto' p='3'>
        <Text>Home Page</Text>
      </Box>
    </Layout>
  )
}
