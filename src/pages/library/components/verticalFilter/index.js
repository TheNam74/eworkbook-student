/* eslint-disable react/destructuring-assignment */
import { Checkbox, Divider } from 'antd'
import { useSelector } from 'react-redux'
import React from 'react'
import Translation from '../../../../services/multi-language'
import withOnFilterChange from '../withOnFilterChange'
import './verticalFilter.scss'

function VerticalFilter(props) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  React.useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return (
    <>
      <Divider className="tw-mt-0" orientation="left" plain />
      <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-mb-2 tw-text-base">
        {t('library.type')}
      </p>
      <Checkbox.Group
        options={props.typeOptions}
        className="tw-grid tw-grid-cols-1 tw-gap-y-3"
        onChange={(checkedValue) => {
          props.handleFilterChange('type', checkedValue)
        }}
        value={props.formData.type}
      />
      <Divider />
      <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-mt-6 tw-mb-2 tw-text-base">
        {t('library.CEFR')}
      </p>
      <Checkbox.Group
        options={props.levelOptions}
        className="tw-grid tw-grid-cols-1 tw-gap-y-3"
        onChange={(checkedValue) => {
          props.handleFilterChange('CEFR', checkedValue)
        }}
        value={props.formData.CEFR}
      />
      <Divider />
      <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-mt-6 tw-mb-2 tw-text-base">
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
      <Divider />
    </>
  )
}
export default withOnFilterChange(VerticalFilter)
