/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Rate } from 'antd'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { t } from 'i18next'
import materialApi from '../../../../api/materialApi'

export default function Card(props) {
  const navigate = useNavigate()
  // eslint-disable-next-line object-curly-newline
  const {
    name,
    CEFR,
    coverImg,
    description,
    _id,
    type,
    ratingStarAverage,
    author,
  } = props
  const fullName = author?.firstName || author?.lastName
    ? `${author?.firstName || ''} ${author?.lastName || ''}`
    : undefined
  let imglink = `${process.env.REACT_APP_API_URL}/materials/images/${coverImg}`
  if (!coverImg) {
    imglink = `${process.env.REACT_APP_API_URL}/materials/images/default.png`
  }
  async function onClick() {
    try {
      const response = await materialApi.getRootMaterial(_id)
      if (response.children?.length > 0) {
        navigate(`/root-detail/${_id}`)
      } else if (type !== 'Exam') {
        navigate(`/exercise/${_id}`)
      } else {
        navigate(`/exam/${_id}`)
      }
    } catch (error) {
      // console.log('Failed to fetch root detail: ', error)
    }
  }
  return (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      onClick={onClick}
      onKeyDown={null}
      className="card tw-cursor-pointer hover:tw-drop-shadow-md tw-relative"
    >
      <div
        className="img-container"
        style={{ width: '100%', height: '50%', overflow: 'hidden' }}
      >
        <img
          className="card__img"
          alt="example"
          src={imglink}
          style={{ width: '100%', height: '200%', overflow: 'hidden' }}
        />
      </div>
      <div className="tw-px-4">
        <div className="">
          <p className="tw-mt-2 tw-mb-0 tw-text-primary tw-text-xl tw-truncate">
            {name}
          </p>
          <p className="tw-mb-2 tw-text-gray-500 tw-text-sm tw-truncate tw-italic">
            {`${t('library.author')}: ${fullName || t('library.unknown')}`}
          </p>
        </div>
        <div className="tw-text-primary tw-text-opacity-70">
          <p className="tw-line-clamp-4">{description}</p>
        </div>
      </div>
      <div className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-absolute tw-bottom-2 tw-w-full">
        <div className="tw-flex tw-items-center">
          <span className="tw-text-gray-400 tw-leading-none tw-mr-2 tw-pt-1">
            {ratingStarAverage ? _.round(ratingStarAverage, 1) : 0}
          </span>
          <Rate
            disabled
            defaultValue={Math.round(ratingStarAverage * 2) / 2}
            allowHalf
            className="tw-text-xs"
          />
        </div>
        <div className="">
          <p
            className="tw-bg-primary tw-bg-opacity-70 tw-w-10 tw-text-blue-100 tw-text-center tw-rounded-lg hover:tw-bg-white hover:tw-text-primary hover:shadow-inner tw-mb-0 before:tw-w-max before:tw-h-max before:tw-content"
            onClick={e => {
              e.stopPropagation()
              props.setFormData(prev => ({
                ...prev,
                CEFR: [CEFR],
              }))
            }}
          >
            {CEFR}
          </p>
        </div>
      </div>
    </div>
  )
}
