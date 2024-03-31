import { css } from '@emotion/react'
import useUser from '@hooks/auth/useUser'
import { colors } from '@styles/colorPalette'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MyImage from '../my/MyImage'
import Button from './Button'
import Flex from './Flex'

export default function Navbar() {
  const { pathname } = useLocation()
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false
  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          <MyImage />
        </Link>
      )
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }
    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
