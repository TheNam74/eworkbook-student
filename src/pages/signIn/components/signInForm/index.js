import "./signInForm.scss"
import {
  Form, Input, Button,
} from "antd";
import { useSelector } from 'react-redux'
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ContinueWith from "../../../../components/continueWith";
import Translation from "../../../../services/multi-language";

function SigninForm({
  onChangeUsername, onChangePassword, username, password, handleLogin,
}) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            message: t('signIn_Out.blankEmail'),
          },
        ]}
      >
        <Input
          placeholder="Email"
          className="tw-rounded-lg"
          value={username}
          onChange={onChangeUsername}
        />
      </Form.Item>
      <Form.Item
        label={t('signIn_Out.password')}
        name="password"
        rules={[
          {
            required: true,
            message: t('signIn_Out.blankPassword'),
          },
        ]}
      >
        <Input
          type="password"
          placeholder={t('signIn_Out.password')}
          className="tw-rounded-lg"
          value={password}
          onChange={onChangePassword}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="h-[44px] border-none hover:bg-blue bg-primary tw-w-full tw-rounded-lg">
          {t('signIn_Out.signin')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/forgotPassword" className="link_text_color">{t('signIn_Out.forgotThePassword')}</Link>
      </Form.Item>
      <Form.Item>
        <ContinueWith />
      </Form.Item>
      <Form.Item>
        <p>
          {t('signIn_Out.dontHaveAccount')}
          ?
          <Link to="/signup" className="link_text_color">
            {' '}
            {t('signIn_Out.signup')}
          </Link>
        </p>
      </Form.Item>
    </Form>
  )
}
export default SigninForm
