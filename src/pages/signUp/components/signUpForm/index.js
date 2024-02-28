import "./signUpForm.scss"
import {
  Form, Input, Button,
} from "antd";
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import ContinueWith from "../../../../components/continueWith";
import Translation from "../../../../services/multi-language";

function SignUpForm({
  handleRegister,
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
      onFinish={handleRegister}
      layout="vertical"
    >
      <div className="tw-flex tw-w-full justify-between">
        <div className="tw-w-full tw-pr-1">
          <Form.Item
            label={t('signIn_Out.firstName')}
            name="firstName"
            className="tw-w-full"
            rules={[
              {
                required: true,
                pattern: /(.|\s)*\S(.|\s)*$/,
                message: t('signIn_Out.blankFirstName'),
              },
            ]}
          >
            <Input placeholder={t('signIn_Out.firstName')} className="tw-rounded-lg" />
          </Form.Item>
        </div>
        <div className="tw-w-full tw-pl-1">
          <Form.Item
            label={t('signIn_Out.lastName')}
            name="lastName"
            className="tw-w-full"
            rules={[
              {
                required: true,
                pattern: /(.|\s)*\S(.|\s)*$/,
                message: t('signIn_Out.blankLastName'),
              },
            ]}
          >
            <Input placeholder={t('signIn_Out.lastName')} className="tw-rounded-lg" />
          </Form.Item>
        </div>
      </div>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: t('signIn_Out.blankEmail'),
          },
          {
            type: 'email',
            message: t('signIn_Out.incorrectEmailFormat'),
          },
        ]}
      >
        <Input placeholder="Email" className="tw-rounded-lg" />
      </Form.Item>
      <div className="tw-flex tw-w-full justify-between">
        <div className="tw-w-full tw-pr-1">
          <Form.Item
            label={t('profile.newPassword')}
            name="password"
            rules={[
              {
                required: true,
                message: t('signIn_Out.blankPassword'),
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: t('signIn_Out.incorrectPasswordFormat'),
              },
            ]}
          >
            <Input
              type="password"
              placeholder={t('signIn_Out.password')}
              className="tw-rounded-lg"
            />
          </Form.Item>
        </div>
        <div className="tw-w-full tw-pl-1">
          <Form.Item
            label={t('profile.newPasswordConfirm')}
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: t('signIn_Out.blankConfirmPassword'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error(`${t('signIn_Out.unmatchedPassword')}`));
                },
              }),
            ]}
          >
            <Input
              type="password"
              placeholder={t('signIn_Out.confirmPassword')}
              className="tw-rounded-lg"
            />
          </Form.Item>
        </div>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button primary_background_color primary_background_color align_button tw-rounded-lg">
          {t('signIn_Out.signup')}
        </Button>
      </Form.Item>
      <Form.Item>
        <ContinueWith />
      </Form.Item>
      <Form.Item>
        <p>
          {t('signIn_Out.haveAccount')}
          ?
          <Link to="/signin" className="link_text_color">
            {' '}
            {t('signIn_Out.signin')}
          </Link>
        </p>
      </Form.Item>
    </Form>
  );
}
export default SignUpForm;
