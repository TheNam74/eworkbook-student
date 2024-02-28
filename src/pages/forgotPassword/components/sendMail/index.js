import {
  Form, Input, Button, Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import userApi from '../../../../api/userApi'
import Translation from "../../../../services/multi-language";

function SendMail({ setEmail, setForgotPasswordState }) {
  const naviagte = useNavigate();

  const lang = useSelector((state) => state.switchLang.lang)

  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    document.title = "eWorkbook - Sign In"
    ChangeLanguage(lang)
  }, [lang])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    naviagte('/signup');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    const currentEmail = e.email;
    const userFindedByEmail = await userApi.sendMailForgetPassword({ email: currentEmail });
    if (userFindedByEmail.data === false) {
      showModal();
    } else {
      setEmail(currentEmail);
      setForgotPasswordState("MailSent");
    }
  }
  const modal = (
    <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={t("forgetPassword.register")} cancelText={t("forgetPassword.cancel")}>
      <p>{t("forgetPassword.theEmailNotRegister")}</p>
      <p>
        {t("forgetPassword.click")}
        {' '}
        <b>{t("forgetPassword.register")}</b>
        {' '}
        {t("forgetPassword.to")}
        {' '}
        <b>{t("signIn_Out.signup")}</b>
        {' '}
        {t("forgetPassword.newAccount")}
      </p>
      <p>
        {t("forgetPassword.orClick")}
        {' '}
        <b>{t("forgetPassword.cancel")}</b>
        {' '}
        {t("forgetPassword.to")}
        {' '}
        <b>{t("forgetPassword.tryAgain")}</b>
      </p>
    </Modal>
  )

  return (
    <>
      <div>
        <div className="tw-font-bold tw-text-black tw-text-xl">
          {t("forgetPassword.sentResetPasswordCode")}
        </div>
        <Form
          name="normal_form"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
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
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="h-[44px] border-none hover:bg-blue bg-primary tw-w-full tw-rounded-lg">
              {t("forgetPassword.sent")}
            </Button>
          </Form.Item>
        </Form>
      </div>
      {modal}
    </>
  );
}
export default SendMail;
