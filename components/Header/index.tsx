import { useLayoutEffect, useState } from 'react'
import { Flex, Box, useMediaQuery, Menu, MenuList, MenuItem, MenuButton, Link as UILink } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImageComponent } from '../Image'

const dummyNav = [
  {
    name: 'Nav item 1',
    link: '/'
  },
  {
    name: 'Nav item 2',
    link: '/'
  },
  {
    name: 'Nav item 3',
    link: '/'
  }
]

export const Header = () => {
  const router = useRouter()
  const [isLargeScreen] = useMediaQuery('(min-width: 900px)')
  const [Nav, setNav] = useState(null)
  useLayoutEffect(() => {
    if (isLargeScreen) {
      setNav(dummyNav.map(({ name, link }, index) => (
        <Link href={link} key={index} passHref><UILink p='4' className={router.pathname ? 'active' : ''}>{name}</UILink></Link>
      )))
    } else {
      setNav(<Menu>
        <MenuButton>Menu</MenuButton>
        <MenuList>
          {dummyNav.map(({ name, link }, index) => (
            <MenuItem key={index} className={router.pathname ? 'active' : ''}><Link href={link}><a className={router.pathname ? 'active' : ''}>{name}</a></Link></MenuItem>
          ))}
        </MenuList>
      </Menu>)
    }
  }, [isLargeScreen])

  return (
        <Box bg='white' boxShadow="base">
            <Flex maxW='xl' m='auto' p='3' justify='space-between' align={'center'}>
              <ImageComponent src='/logo.png' width='200px' alt='logo'/>
              <Flex>
                {Nav}
              </Flex>
            </Flex>
        </Box>
  )
}
