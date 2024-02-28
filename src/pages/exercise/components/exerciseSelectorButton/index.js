import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Button, Row, Col } from 'antd'
import './exerciseSelectorButton.scss'
import Translation from '../../../../services/multi-language'

function ExerciseSelectorButton({ handleConfirm }) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return (
    <Row className="tw-w-full tw-flex tw-justify-center" gutter={[16, 16]}>
      {/* <Col span={6} className="submit-button">
        <Button className="tw-bg-primary tw-text-white tw-text-bold tw-text-lg tw-py-2 tw-text-center tw-px-4 tw-rounded-md">
          {'<'}
        </Button>
      </Col> */}
      <Col span={24} className="tw-flex tw-justify-center submit-button">
        <Button onClick={handleConfirm} className="tw-bg-primary tw-text-white tw-text-bold tw-py-2 tw-text-center tw-px-4 tw-rounded-md">
          {t('exercise.submit')}
        </Button>
      </Col>
      {/* <Col span={6} className="submit-button tw-flex tw-justify-end">
        <Button className="tw-bg-primary tw-text-white tw-text-bold tw-text-lg tw-py-2 tw-text-center tw-px-4 tw-rounded-md">
          {'>'}
        </Button>
      </Col> */}
    </Row>
  )
}

export default ExerciseSelectorButton
