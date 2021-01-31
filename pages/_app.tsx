import '../styles/globals.css'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
  GithubClient,
  TinacmsGithubProvider
} from 'react-tinacms-github'
import { NextGithubMediaStore } from 'next-tinacms-github'
import { DateFieldPlugin } from 'react-tinacms-date'
import styled from 'styled-components'

const sizes = {
  sm: '400px',
  md: '600px',
  lg: '900px',
  xl: '1200px'
}

const Container = styled.div`
 h1 {
   font-size: 3rem;
 }
 h2 {
   font-size: 2.5rem;
 }
 h3 {
  font-size: 2.2rem;
}
h4 {
  font-size: 2rem;
}
h5 {
  font-size: 1.5rem;
}
h6 {
  font-size: 1rem;
}
[class^="MenuOption"] {
  color: black !important;
}
img {
  margin: 0 auto;
}
table {
  margin: 0 auto;
  color: #333;
  background: white;
  border: 1px solid grey;
  font-size: 12pt;
  border-collapse: collapse;
}
table thead th,
table tfoot th {
  color: #777;
  background: rgba(0,0,0,.1);
}
table caption {
  padding:.5em;
}
table th,
table td {
  padding: .5em;
  border: 1px solid lightgrey;
}
`

const theme: ThemeConfig = extendTheme({ sizes })

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch('/api/preview', { headers: headers })
  const data = await resp.json()

  if (resp.status === 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch('/api/reset-preview').then(() => {
    window.location.reload()
  })
}

export default class Site extends App {
  cms: TinaCMS

  constructor(props) {
    super(props)

    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      baseBranch: process.env.BASE_BRANCH // e.g. 'master' or 'main' on newer repos
    })

    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        github
      },
      media: new NextGithubMediaStore(github),
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview
    })
    this.cms.plugins.add(DateFieldPlugin)
    import('react-tinacms-editor').then(
      ({ HtmlFieldPlugin }) => {
        this.cms.plugins.add(HtmlFieldPlugin)
      }
    )
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >
          <ChakraProvider theme={theme}>
            <Container>
              <Component {...pageProps} />
              <EditLink cms={this.cms} />
            </Container>
          </ChakraProvider>
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

export interface EditLinkProps {
  cms: TinaCMS
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
