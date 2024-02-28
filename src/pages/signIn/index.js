import './signIn.scss'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Col, Image, Row, Alert,
} from 'antd'

import { useNavigate } from 'react-router-dom'
import SigninForm from './components/signInForm'
import authApi from '../../api/authApi'
import Translation from '../../services/multi-language'

function LoginMessage({ content }) {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  )
}

function SignIn() {
  const lang = useSelector((state) => state.switchLang.lang)

  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    document.title = "eWorkbook - Sign In"
    ChangeLanguage(lang)
  }, [lang])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const onChangePassword = (e) => setPassword(e.target.value)
  const handleLogin = async (values) => {
    const newUser = {
      email: values.username,
      password: values.password,
      role: 'Student',
    }
    setLoginStatus(await authApi.loginUser(newUser, dispatch, navigate))

    // const user=useSelector((state) => state.auth.login.currentUser)
    // setLoginStatus(user)
  }
  const formColResposive = {
    xs: 22,
    sm: 22,
    md: 10,
    xl: 8,
    xxl: 8,
  }
  const imageColResponsive = {
    xs: 0,
    sm: 0,
    md: 10,
    xl: 12,
    xxl: 12,
  }
  return (
    <div className="signin__custom padding_top padding_bottom">
      <Row justify="space-evenly">
        <Col {...formColResposive}>
          <div className="curly_border center_content">
            <div className="align_content">
              <h1 className="title align_text_left">
                {t('signIn_Out.signin')}
              </h1>
              <p className="align_text_left">{t('signIn_Out.presentation')}</p>
              {loginStatus === undefined && (
                <LoginMessage content={t('signIn_Out.failSignIn')} />
              )}
              <SigninForm
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
                username={username}
                password={password}
                handleLogin={handleLogin}
              />
            </div>
          </div>
        </Col>
        <Col {...imageColResponsive}>
          <Image src="/assets/images/signinImg.png" preview={false} />
        </Col>
      </Row>
    </div>
  )
}

export default SignIn
