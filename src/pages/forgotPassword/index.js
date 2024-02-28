import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ChangePasswordForgotten from "./components/changePasswordForgotten";
import SendMail from "./components/sendMail";
import Translation from "../../services/multi-language";

function ForgotPassword() {
  const { email, randomString } = useParams();
  const [currentEmail, setCurrentEmail] = useState(email || "")
  const currentRandomString = randomString || "";
  const [forgotPasswordState, setForgotPasswordState] = useState(email && randomString ? "ChangePasswordForgotten" : "SendMail");

  const lang = useSelector((state) => state.switchLang.lang)

  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    document.title = "eWorkbook - Sign In"
    ChangeLanguage(lang)
  }, [lang])

  return (
    <div className="box">
      <div className="tw-m-4 curly_border center_content">
        <div className="align_content">
          {forgotPasswordState === "SendMail" && <SendMail setEmail={setCurrentEmail} setForgotPasswordState={setForgotPasswordState} />}
          {forgotPasswordState === "MailSent"
          && (
            <div>
              <CheckOutlined />
              <p>
                {t("forgetPassword.checkMailBoxMessage")}
              </p>
            </div>
          )}
          {forgotPasswordState === "ChangePasswordForgotten" && <ChangePasswordForgotten email={currentEmail} randomString={currentRandomString} />}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
