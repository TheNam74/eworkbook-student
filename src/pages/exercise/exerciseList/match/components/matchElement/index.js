/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
import './matchElement.scss'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import ExerciseContainer from '../exerciseContainer'
import '../exerciseContainer/exerciseContainer.scss'

function MatchElement({
  elementData,
  onChoosen,
  colInChoosing,
  currentColKey,
  totalCol,
  colCanChoose,
  sideCanChoosse,
  clear,
  isDoingMode,
  exId,
}) {
  const rightButtonClassName = `${elementData.id}R`
  const leftButtonClassName = `${elementData.id}L`
  const rightButtonClassNameWithId = `${exId}_${rightButtonClassName}`
  const leftButtonClassNameWithId = `${exId}_${leftButtonClassName}`
  const [leftDisabled, setLeftDisabled] = useState(false)
  const [rightDisabled, setRightDisabled] = useState(false)
  const [leftIsChoosen, setLeftIsChoosen] = useState(false)
  const [rightIsChoosen, setRightIsChoosen] = useState(false)
  const imageColResponsive = {
    xs: 16,
    sm: 16,
    md: 16,
    xl: 18,
    xxl: 18,
  }
  const leftButtonClicked = () => {
    if (leftDisabled === false) {
      onChoosen(leftButtonClassName)
      setLeftDisabled(!leftDisabled)
      setLeftIsChoosen(true)
    }
  }
  const rightButtonClicked = () => {
    if (rightDisabled === false) {
      onChoosen(rightButtonClassName)
      setRightDisabled(!rightDisabled)
      setRightIsChoosen(true)
    }
  }

  useEffect(() => {
    setLeftIsChoosen(false)
    setRightIsChoosen(false)
    setLeftDisabled(false)
    setRightDisabled(false)
  }, [clear])

  return (
    <div className="padding_top tw-w-full tw-h-full">
      <Row className="tw-h-full tw-flex tw-justify-between tw-items-center tw-mx-5">
        <Col span={1}>
          {currentColKey !== 1 && (
            <div>
              <input
                type="radio"
                className={`${leftButtonClassNameWithId} option-input radio option-input--left`}
                onClick={leftButtonClicked}
                value={leftButtonClassName}
                checked={leftIsChoosen}
                disabled={
                  colInChoosing
                  || leftDisabled
                  || (colCanChoose !== currentColKey && colCanChoose !== 0)
                  || (sideCanChoosse !== 'L' && sideCanChoosse !== '')
                  || !isDoingMode
                }
              />
            </div>
          )}
        </Col>
        <Col
          offset={1}
          {...imageColResponsive}
          className="tw-flex tw-justify-between tw-overflow-hidden md:tw-max-w[90px] lg:tw-max-w-[123px] xl:tw-max-w[150px]"
        >
          <ExerciseContainer
            classNames="tw-container tw-items-center image-wrap match__match-element tw-text-center tw-flex !tw-justify-center tw-bg-[white] tw-text-black tw-rounded-xl !tw-pt-[14px]"
            html={elementData.element}
          />
          {/* <div className="tw-container tw-items-center tw-w-52 tw-h-40" dangerouslySetInnerHTML={{ __html: elementData.element }} /> */}
        </Col>
        <Col offset={1}>
          {currentColKey !== totalCol && (
            <input
              type="radio"
              className={`${rightButtonClassNameWithId} option-input radio option-input--right`}
              onClick={rightButtonClicked}
              value={rightButtonClassName}
              checked={rightIsChoosen}
              disabled={
                colInChoosing
                || rightDisabled
                || (colCanChoose !== currentColKey && colCanChoose !== 0)
                || (sideCanChoosse !== 'R' && sideCanChoosse !== '')
                || !isDoingMode
              }
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default MatchElement
