import { Modal } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ModelZIndex } from '../../../../constant'
import Translation from '../../../../services/multi-language'

function PleaseLoginModal({ visible, setVisible }) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()

  const navigate = useNavigate()

  const handleOk = () => {
    navigate('/login')
  }
  const handleCancel = () => {
    setVisible(false)
  }

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return (
    <Modal
      title={t('exercise.pleaseLogin')}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      zIndex={ModelZIndex}
    >
      <p>{t('exercise.pleaseLoginContent')}</p>
    </Modal>
  )
}

export default PleaseLoginModal
