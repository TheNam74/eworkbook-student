/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Rate } from 'antd'
import _ from 'lodash'

function Filter(props) {
  function handleFilterChange(field, value) {
    const { formData, setFormData } = props
    if (field === 'ratingStarAverage' && value.length === 2) {
      _.remove(value, (item) => item === formData.ratingStarAverage[0])
    }

    // eslint-disable-next-line arrow-parens
    setFormData(prev => ({
      ...prev,
      current: 1,
      [field]: value,
    }))
  }
  const typeOptions = props.types?.map((type) => ({ label: type, value: type }))
  const levelOptions = props.levels?.map((type) => ({ label: type, value: type }))
  const rateOptions = [
    {
      label: (
        <Rate disabled defaultValue={5} className="tw-text-base rate-filter" />
      ),
      value: 5,
    },
    {
      label: (
        <Rate disabled defaultValue={4} className="tw-text-base rate-filter" />
      ),
      value: 4,
    },
    {
      label: (
        <Rate disabled defaultValue={3} className="tw-text-base rate-filter" />
      ),
      value: 3,
    },
    {
      label: (
        <Rate disabled defaultValue={2} className="tw-text-base rate-filter" />
      ),
      value: 2,
    },
    {
      label: (
        <Rate disabled defaultValue={1} className="tw-text-base rate-filter" />
      ),
      value: 1,
    },
  ]

  const { component: C } = props
  // eslint-disable-next-line react/jsx-no-bind
  return (
    <C
      {...props}
      // eslint-disable-next-line react/jsx-no-bind
      handleFilterChange={handleFilterChange}
      typeOptions={typeOptions}
      levelOptions={levelOptions}
      rateOptions={rateOptions}
    />
  )
}

export default function withOnFilterChange(component) {
  // eslint-disable-next-line func-names
  return function (props) {
    return <Filter component={component} {...props} />
  }
}
