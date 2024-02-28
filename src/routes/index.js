import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PrivateRouter from './private'
import PublicRouter from './public'

function Routes({ user }) {
  function useScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])
  }
  useScrollToTop()
  return user ? <PrivateRouter /> : <PublicRouter />
}

export default Routes
