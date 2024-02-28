import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userApi from "../../../../api/userApi";
import authApi from "../../../../api/authApi";
import Translation from "../../../../services/multi-language";

function ChangePasswordForgotten({ email, randomString }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (password, role) => {
    const newUser = {
      email,
      password,
      role,
    }
    await authApi.loginUser(newUser, dispatch, navigate)
  }

  const handleSubmit = async (e) => {
    if (e.password !== e.passwordConfirm) {
      return;
    }
    try {
      const resetPasswordResult = await userApi.resetForgottenPassword({
        email,
        randomString,
        newPassword: e.password,
      })
      if (resetPasswordResult) {
        await handleLogin(e.password, "Student");
      } else {
        // console.log("Reset fail!")
      }
    } catch (error) {
      // console.log("change password when forgotten fail with error: ", error)
    }
  }

  const lang = useSelector((state) => state.switchLang.lang)

  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    document.title = "eWorkbook - Sign In"
    ChangeLanguage(lang)
  }, [lang])

  return (
    <div>
      <div className="tw-font-bold tw-text-black tw-text-xl">
        {t("forgetPassword.setNewPassword")}
      </div>
      <Form
        name="normal_form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label={t("signIn_Out.password")}
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
        <Form.Item
          label={t('signIn_Out.confirmPassword')}
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="h-[44px] border-none hover:bg-blue bg-primary tw-w-full tw-rounded-lg">
            {t("forgetPassword.changePassword")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePasswordForgotten;
