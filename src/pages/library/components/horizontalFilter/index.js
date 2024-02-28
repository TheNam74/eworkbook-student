/* eslint-disable react/destructuring-assignment */
import { useSelector } from 'react-redux'
import { Checkbox } from 'antd'
import React from 'react'
import Translation from '../../../../services/multi-language';
import withOnFilterChange from '../withOnFilterChange'
import './horizontalFilter.scss'

function HorizontalFilter(props) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  React.useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return (
    <div className="sm:tw-flex sm:tw-justify-around">
      <div>
        <div>
          <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-text-base">
            {t('library.type')}
          </p>
          <Checkbox.Group
            options={props.typeOptions}
            className="tw-mt-2"
            onChange={(checkedValue) => {
              props.handleFilterChange('type', checkedValue)
            }}
            value={props.formData.type}
          />
        </div>
        <div>
          <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-text-base tw-mt-4">
            {t('library.CEFR')}
          </p>
          <Checkbox.Group
            options={props.levelOptions}
            className="tw-mt-2"
            onChange={(checkedValue) => {
              props.handleFilterChange('CEFR', checkedValue)
            }}
            value={props.formData.CEFR}

          />
        </div>
      </div>
      <div>
        <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-text-base tw-mt-4 sm:tw-mt-0">
          {t('library.ratingStarAverage')}
        </p>
        <div>
          <Checkbox.Group
            options={props.rateOptions}
            className="tw-grid tw-grid-cols-1 tw-gap-y-2"
            onChange={(checkedValue) => {
              props.handleFilterChange('ratingStarAverage', checkedValue)
            }}
            value={props.formData.ratingStarAverage}

          />
        </div>
      </div>
    </div>
  )
}
export default withOnFilterChange(HorizontalFilter)
