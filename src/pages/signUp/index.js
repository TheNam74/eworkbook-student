import "./signUp.scss";
import React, { useEffect } from "react";
import {
  Col, Image, Row, Alert,
} from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SignUpFrom from "./components/signUpForm";
import Translation from "../../services/multi-language";
import authApi from "../../api/authApi";

function signup() {
  const lang = useSelector((state) => state.switchLang.lang)
  const [signUpState, setSignUpState] = React.useState({});
  const { t, ChangeLanguage } = Translation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function SignUpMessage({ status }) {
    return (
      <Alert
        style={{
          marginBottom: 24,
        }}
        message={status === "success" ? t('signIn_Out.registerSuccess') : t('signIn_Out.registerFail')}
        type={status}
        showIcon
      />
    );
  }

  useEffect(() => {
    document.title = "eWorkbook - Sign Up"
    ChangeLanguage(lang)
  }, [lang])

  const formColResposive = {
    xs: 22,
    sm: 22,
    md: 10,
    xl: 8,
    xxl: 8,
  };
  const imageColResponsive = {
    xs: 0,
    sm: 0,
    md: 10,
    xl: 12,
    xxl: 12,
  }
  const handleRegister = async (values) => {
    const {
      password, email, firstName, lastName,
    } = values;
    const newUser = {
      password, email, firstName, lastName, role: "Student",
    };
    const ret = await authApi.registerUser(newUser, dispatch, navigate);
    if (ret.id === undefined) setSignUpState({ status: 'error' });
  };
  return (
    <div className="signup__custom padding_top padding_bottom">
      <Row justify="space-evenly">
        <Col {...formColResposive}>
          <div className="curly_border center_content">
            <div className="align_content">
              <h1 className="title align_text_left">{t('signIn_Out.signup')}</h1>
              <p className="align_text_left">
                {t('signIn_Out.presentation')}
              </p>
              {(signUpState?.status === "error" || signUpState?.status === "success") && (
                <SignUpMessage status={signUpState.status} />
              )}
              <SignUpFrom handleRegister={handleRegister} />
            </div>
          </div>
        </Col>
        <Col {...imageColResponsive}>
          <Image src="/assets/images/signinImg.png" preview={false} />
        </Col>
      </Row>
    </div>
  );
}

export default signup;
