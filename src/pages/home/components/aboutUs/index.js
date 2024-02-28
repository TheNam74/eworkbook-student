import React, { useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import { useSelector } from 'react-redux';
import AboutUsImg from '../aboutUsImg'
import Translation from '../../../../services/multi-language';

import './aboutUs.scss'

function AboutUs() {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  return (
    <Row className="about-us box">
      <Col className="about-us__image" sm={0} md={12} lg={12}>
        <AboutUsImg />
      </Col>
      <Col className="about-us__content" sm={24} md={12} lg={12}>
        <span className="about-us__content__header">{t('aboutUs.label')}</span>
        <p className="about-us__content__short">
          {t('aboutUs.title')}
        </p>
        <p className="about-us__content__long">
          {t('aboutUs.content')}
        </p>
        <Button className="button bg-primary">
          {t('aboutUs.button')}
        </Button>
      </Col>
    </Row>
  )
}

export default AboutUs
