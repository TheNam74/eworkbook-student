/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'antd'
import './exerciseCard.scss'
import Translation from '../../../../services/multi-language'
import { ModelZIndex } from '../../../../constant'

function ExcerciseCard({
  title,
  children,
  id,
  className,
  exerciseType,
  exerciseAudio,
}) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  let instruction = 'Loading................'
  if (exerciseType) {
    // console.log("exerciseType =", exerciseType)
    if (exerciseType === 'crossword') {
      localStorage.removeItem('guesses')
    }
    instruction = t(`exerciseInstruction.${exerciseType}`)
  }

  const [isShowModal, setIsShowModal] = useState(false)

  const showModal = () => {
    setIsShowModal(true)
  }

  const hideModal = () => {
    setIsShowModal(false)
  }
  const modal = (
    <Modal
      title={t(`exerciseInstruction.instruction`)}
      visible={isShowModal}
      onOk={hideModal}
      onCancel={hideModal}
      footer={[
        <Button key="submit" type="primary" onClick={hideModal}>
          Ok
        </Button>,
      ]}
      zIndex={ModelZIndex}
    >
      <p>{instruction}</p>
    </Modal>
  )
  return (
    <React.Fragment>
      <p id={id} className="tw-mb-6">
        &nbsp;
      </p>
      <div className={`exercise-card ${className}`}>
        {modal}
        <div className="exercise-card__title tw-relative">
          <QuestionCircleOutlined
            className="tw-absolute tw-right-0 tw-top-0 tw-p-2 hover:tw-cursor-pointer"
            onClick={showModal}
          />
          {title}
        </div>
        {exerciseAudio && (
          <div className="tw-flex tw-justify-center tw-items-center tw-border-[1.5px] tw-border-solid tw-border-primary tw-rounded-full tw-mt-4 tw-w-fit tw-px-5 tw-mx-auto tw-mb-5">
            <h3 className="tw-text-center tw-text-primary tw-m-0 tw-mr-5 tw-ml-5">
              {t('exercise.listenToAudio')}
            </h3>
            <audio
              controls
              src={`${process.env.REACT_APP_API_URL}/exercises/audios/${exerciseAudio}`}
              type="audio/mpeg"
            >
              <track kind="captions" />
            </audio>
          </div>
        )}
        <div className="exercise-card__content">{children}</div>
      </div>
    </React.Fragment>
  )
}

export default ExcerciseCard
