import React, { useEffect } from 'react'
import {
  Form, Input, Button, message,
} from 'antd'
import { useSelector } from 'react-redux'
import Translation from '../../../../services/multi-language'
import './inform.scss'
import consultApi from '../../../../api/consultApi'

function Inform() {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return (
    <div className="inform box" id="inform">
      <div className="inform__left">
        <img src="assets/images/inform-image.png" alt="kid reading book" />
      </div>
      <div className="inform__right">
        <Form
          layout="vertical"
          onFinish={async (consult) => {
            try {
              const res = await consultApi.createConsult(consult)
              console.log(res)
              message.success({
                content: t('inform.success'),
                className: 'tw-mt-20',
              })
            } catch (err) {
              // console.log(err)
              message.error({
                content: t('inform.error'),
                className: 'tw-mt-20',
              })
            }
          }}
          onFinishFailed={(e) => {
            console.log(e)
          }}
        >
          <div className="inform__right__label">
            <span>{t('inform.label')}</span>
          </div>
          <Form.Item
            name="phone"
            label={t('inform.phone')}
            required
            tooltip={t('inform.required')}
            rules={[
              { required: true, message: t('inform.required') },
              {
                pattern: /^((09|03|07|08|05)+([0-9]{8})\b)$/g,
                message: t('inform.invalidPhone'),
              },
            ]}
          >
            <Input placeholder={t('inform.placeholderPhone')} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            required
            rules={[
              { required: true, message: t('inform.required') },
              { type: 'email', message: t('inform.invalidEmail') },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item>
            <Button
              className="button bg-primary"
              htmlType="submit"
              initialValues={{ remember: true }}
            >
              {t('inform.button')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Inform
