import React, { useEffect } from 'react'
// eslint-disable-next-line object-curly-newline
import { Row, Col, Divider, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Translation from '../../services/multi-language'

import './footer.scss'

function Footer() {
  // eslint-disable-next-line arrow-parens
  const lang = useSelector(state => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  return (
    <Layout.Footer className="footer box tw-mt-16 sm:tw-mt-36">
      <Row>
        <Col
          xs={{ offset: 0, span: 24 }}
          sm={{ offset: 0, span: 12 }}
          md={{ offset: 0, span: 12 }}
          lg={{ offset: 0, span: 10 }}
        >
          <img
            className="footer__logo"
            src="/assets/images/logo3.png"
            alt="eWorkbook logo"
          />
          <p>{t('footer.statement')}</p>
        </Col>
        <Col
          xs={{ offset: 0, span: 24 }}
          sm={{ offset: 1, span: 11 }}
          md={{ offset: 1, span: 11 }}
          lg={{ offset: 1, span: 6 }}
        >
          {/* footer - forstudent */}
          <h2 className="footer__header">{t('footer.forstudent')}</h2>
          {/* footer - library */}
          <Link className="footer__link" to="/library">
            {t('footer.library')}
          </Link>
          {/* footer - history */}
          <Link className="footer__link" to="/history/currentuser">
            {t('footer.history')}
          </Link>
          {/* footer - profile */}
          <Link className="footer__link" to="/profile">
            {t('footer.profile')}
          </Link>
        </Col>
        <Col
          xs={{ offset: 0, span: 24 }}
          sm={{ offset: 0, span: 12 }}
          md={{ offset: 0, span: 12 }}
          lg={{ offset: 0, span: 6 }}
        >
          {/* footer - links */}
          <h2 className="footer__header">{t('footer.links')}</h2>
          <a className="footer__link" href="https://teacher.eworkbook.me">
            Eworkbook Teacher
          </a>
        </Col>
      </Row>
      <Divider className="footer__divider" />
      {/* footer - copyright */}
      <div className="footer__copyright">{t('footer.copyright')}</div>
    </Layout.Footer>
  )
}

export default Footer
