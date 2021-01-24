import '../styles/globals.css'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

const sizes = {
  sm: '400px',
  md: '600px',
  lg: '900px',
  xl: '1200px'
}

const theme: ThemeConfig = extendTheme({ sizes })

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
