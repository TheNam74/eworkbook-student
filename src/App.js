import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authApi from './api/authApi'
import { loginSucess } from './store/slice/authSlice'
import Routes from './routes'

let first = true
function App() {
  const user = useSelector((state) => state.auth.login.currentUser)
  const dispatch = useDispatch()
  useEffect(() => {
    // console.log('User change : ', first, user)
    if (user === null || first) {
      const getUser = async () => {
        try {
          await authApi.getCurrentUser(dispatch)
        } catch (error) {
          // console.log("Get current user error", error)
          dispatch(loginSucess(null))
        }
      }
      first = false
      getUser(dispatch)
    }
  }, [user])

  return (
    <BrowserRouter>
      <Routes user={user} />
    </BrowserRouter>
  )
}
export default App
