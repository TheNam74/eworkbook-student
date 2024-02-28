import './continueWith.scss'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'antd'
import {
  FacebookOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import Translation from '../../services/multi-language'

function ContinueWith() {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return (
    <div>
      <p>{t('signIn_Out.orContinueWith')}</p>
      <Row justify="center">
        <Col span={3}>
          <Button
            icon={<GoogleOutlined style={{ fontSize: '32px' }} />}
            href={`${process.env.REACT_APP_API_URL}/auth/google/login`}
          />
        </Col>
        <Col span={3} offset={3}>
          <Button
            icon={<FacebookOutlined style={{ fontSize: '32px' }} />}
            href={`${process.env.REACT_APP_API_URL}/auth/facebook/login`}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ContinueWith
