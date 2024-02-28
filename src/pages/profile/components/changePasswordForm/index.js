import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Form, Input, Button,
} from 'antd';
import Translation from '../../../../services/multi-language';
import "../../index.scss"

function ChangePasswordForm({
  email,
  handleSubmitChangePassword,
  currentPassword,
  newPassword,
  newPasswordConfirm,
  onCurrentPasswordChange,
  onNewPasswordConfirmChange,
  onNewPasswordChange,
}) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  // // console.log("render change password form, ",currentPassword)
  return (
    <div className="tw-px-0 md:tw-px-5">
      <div className="tw-text-primary tw-ml-10 md:tw-my-10 md:tw-text-5xl xs:tw-text-2xl xs:tw-hidden sm:tw-text-2xl sm:tw-my-2">{t('profile.passwordHeader')}</div>
      <Form
        name="normal_login"
        className="tw-w-full tw-px-0 xs:tw-py-[30px]"
        onFinish={handleSubmitChangePassword}
        layout="vertical"
      >
        <div className="tw-inline-grid md:tw-grid-cols-1 grid-cols-1 tw-gap-0 tw-w-full">
          <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
            <Form.Item
              label="Email"
              name="email"
              className="tw-text-primary tw-w-full"
            >
              <Input
                className="tw-rounded-lg tw-bg-white disabled"
                defaultValue={email}
                disabled="true"
              />
            </Form.Item>
          </div>
          <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
            <Form.Item
              label={t('profile.currentPassword')}
              name="currentPassword"
              className="tw-text-primary tw-w-full"
              rules={[
                {
                  required: true,
                  message: t('profile.blank'),
                },
              ]}
            >
              <Input
                type="password"
                placeholder={t('profile.currentPassword')}
                className="tw-rounded-lg tw-bg-white"
                value={currentPassword}
                onChange={onCurrentPasswordChange}
              />
            </Form.Item>
          </div>
          <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
            <Form.Item
              label={t('profile.newPassword')}
              name="newPassword"
              className="tw-text-primary tw-w-full"
              rules={[
                {
                  required: true,
                  message: t('profile.blank'),
                },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: t('profile.passwordFormat'),
                },
              ]}
            >
              <Input
                type="password"
                placeholder={t('profile.newPassword')}
                className="tw-rounded-lg tw-bg-white"
                value={newPassword}
                onChange={onNewPasswordChange}
              />
            </Form.Item>
          </div>
          <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
            <Form.Item
              label={t('profile.newPasswordConfirm')}
              name="newPasswordConfirm"
              className="tw-text-primary tw-w-full"
              rules={[
                {
                  required: true,
                  message: t('profile.blank'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error(`${t('profile.passwordNotMatch')}`));
                  },
                }),
              ]}
            >
              <Input
                type="password"
                placeholder={t('profile.newPasswordConfirm')}
                className="tw-rounded-lg tw-bg-white tw-w-full"
                value={newPasswordConfirm}
                onChange={onNewPasswordConfirmChange}
              />
            </Form.Item>
          </div>

        </div>
        <div className="tw-w-full tw-flex tw-items-center tw-justify-center xs:tw-my-5 sm:tw-my-5">
          <Button type="primary" htmlType="submit" className="tw-w-1/3 tw-px-10 hover:bg-blue tw-rounded-lg bg-primary tw-flex tw-justify-center ">
            {t('profile.update')}
          </Button>
        </div>
      </Form>

    </div>
  );
}

export default ChangePasswordForm;
