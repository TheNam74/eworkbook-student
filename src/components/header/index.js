/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import NavContent from './components/navContent'
import NavLink from './components/navLink'

import './header.scss'
import { useSelector } from 'react-redux'

function Header(props) {
  const { isSignIn } = props

  return (
    <Layout.Header className="header tw-shadow-lg box">
      <Link to="/">
        <img
          src="/assets/images/logo3-min.png"
          alt="eWorkbook logo"
          className="navbar__logo"
        />
      </Link>
      {isSignIn && <NavLink />}
      <NavContent isOpen={isSignIn} />
    </Layout.Header>
  )
}

export default Header
