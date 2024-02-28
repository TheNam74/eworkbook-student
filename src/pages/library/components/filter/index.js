import { Checkbox, Divider, Rate } from 'antd'
import React from 'react'
import './filter.scss'

export default function Filter({ types, levels }) {
  const typeOptions = types.map((type) => ({ label: type, value: type }))
  const levelOptions = levels.map((type) => ({ label: type, value: type }))
  const rateOptions = [
    {
      label: (
        <Rate
          disabled
          defaultValue={5}
          className="tw-text-base rate-filter"
        />
      ),
      value: 5,
    },
    {
      label: (
        <Rate
          disabled
          defaultValue={4}
          className="tw-text-base rate-filter"
        />
      ),
      value: 4,
    },
    {
      label: (
        <Rate
          disabled
          defaultValue={3}
          className="tw-text-base rate-filter"
        />
      ),
      value: 3,
    },
    {
      label: (
        <Rate
          disabled
          defaultValue={2}
          className="tw-text-base rate-filter"
        />
      ),
      value: 2,
    },
    {
      label: (
        <Rate
          disabled
          defaultValue={1}
          className="tw-text-base rate-filter"
        />
      ),
      value: 1,
    },
  ]
  return (
    <>
      <Divider className="tw-mt-0" orientation="left" plain />
      <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-mb-2 tw-text-base">
        Material type
      </p>
      <Checkbox.Group
        options={typeOptions}
        className="tw-grid tw-grid-cols-1 tw-gap-y-3"
      />
      <Divider />
      <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-mt-6 tw-mb-2 tw-text-base">
        Level
      </p>
      <Checkbox.Group
        options={levelOptions}
        className="tw-grid tw-grid-cols-1 tw-gap-y-3"
      />
      <Divider />
      <p className="tw-uppercase tw-font-bold tw-text-primary tw-m-0 tw-mt-6 tw-mb-2 tw-text-base">
        Rating
      </p>
      <div>
        <Checkbox.Group
          options={rateOptions}
          className="tw-grid tw-grid-cols-1 tw-gap-y-2"
        />
      </div>
      <Divider />
    </>
  )
}
