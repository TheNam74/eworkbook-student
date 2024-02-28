/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react'
import { Tag, Pagination, Input } from 'antd'
import { DebounceInput } from 'react-debounce-input'
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'
import Card from './components/card'
import VerticalFilter from './components/verticalFilter'
import HorizontalFilter from './components/horizontalFilter'
import './index.scss'
import Translation from '../../services/multi-language'
import materialApi from '../../api/materialApi'

const { CheckableTag } = Tag

let levels = []
let types = []
const tags = ['name', 'CEFR', 'ratingStarAverage', 'timeCreate']
// const tags = ['Name', 'Level', 'Rating', 'Newest']
// const tags = ['Tên', 'Cấp độ', 'Đánh giá', 'Mới nhất']
const defaultFormData = {
  current: 1,
  pageSize: 6,
  sortBy: "name",
}

function Library() {
  useEffect(() => {
    document.title = "eWorkbook - Library"
    async function getFields() {
      try {
        const fields = await materialApi.getMaterialFields()
        levels = fields.levels
        types = fields.types
      } catch (err) {
        // console.log(err)
      }
    }
    getFields()
  }, [])

  // hook for query string
  // Tung added searchParams and useEffect for searchParams
  const [searchParams, setSearchParams] = useSearchParams()
  const params = {}
  for (const [key, value] of searchParams.entries()) {
    params[key] = value
  }
  const [formData, setFormData] = useState({
    ...defaultFormData,
    ...params,
  })
  const [sortAsc, setSortAsc] = useState(formData.sortBy[0] !== '-')
  useEffect(() => {
    const prevCleanSortBy = formData.sortBy.replace('-', '')
    const sortBy = sortAsc ? prevCleanSortBy : `-${prevCleanSortBy}`
    setFormData(prev => ({
      ...prev,
      sortBy,
    }))
  }, [sortAsc])
  useEffect(() => {
    if (_.isEqual(params, {})) {
      setFormData(defaultFormData)
    }
  }, [searchParams])
  const lang = useSelector(state => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  const [response, setResponse] = useState({ data: [], total: 0 })
  useEffect(() => {
    setSearchParams(formData)
    const getAllMaterials = async () => {
      try {
        const myResponse = await materialApi.getMaterials({
          ...formData,
          status: 'public',
          name: formData.name !== '' ? formData.name : undefined,
          depthLevel: 1,
        })
        // console.log('Fetch OK', myResponse)
        setResponse(myResponse)
      } catch (err) {
        // console.log(err)
      }
    }
    getAllMaterials()
  }, [formData])

  const onPaginationChange = (page, pageSize) => {
    setFormData(prev => ({
      ...prev,
      current: page,
      pageSize,
    }))
  }

  const onNameSearchChange = e => {
    setFormData(prevFormData => ({
      ...prevFormData,
      current: 1,
      name: e.target.value,
    }))
  }

  const handleChangeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      sortBy: tag,
    }))
  }
  return (
    <div className="tw-grid tw-grid-cols-5 bg-green-300 box tw-mt-10">
      <div className="tw-hidden md:tw-block md:tw-col-span-1 tw-pr-4">
        <VerticalFilter
          types={types}
          levels={levels}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="tw-col-span-full md:tw-col-span-4 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 2xl:tw-grid-cols-3 tw-justify-items-center tw-gap-8 tw-auto-rows-min">
        <DebounceInput
          debounceTimeout={500}
          onChange={onNameSearchChange}
          placeholder={t('library.searchMaterial')}
          element={Input}
          className="tw-col-span-full tw-justify-self-stretch tw-rounded-lg tw-h-12 tw-px-5"
          suffix={
            <SearchOutlined className="tw-cursor-pointer tw-text-2xl tw-leading-none" />
          }
          allowClear
        />
        <div className="tw-col-span-full tw-justify-self-stretch tw-self-start tw-select-none tw-flex tw-items-center tw-flex-wrap ">
          <span className="tw-mr-8 tw-text-base tw-font-bold tw-text-primary tw-cursor-pointer" onClick={() => setSortAsc(prev => !prev)}>
            {!formData.sortBy.includes('-') ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
            Sort by
          </span>
          {tags.map(tag => (
            <CheckableTag
              className="tw-text-base tw-rounded-full tw-border-1 tw-border-primary tw-py-1 tw-px-4 tw-m-0 tw-my-2 tw-mr-4 tw-shadow-lg"
              key={tag}
              checked={formData.sortBy.replace('-', '') === tag}
              onChange={checked => handleChangeTag(tag, checked)}
            >
              {t(`library.${tag}`)}
            </CheckableTag>
          ))}
        </div>
        <div className="tw-col-span-full tw-justify-self-stretch tw-select-none tw-flex-wrap md:tw-hidden">
          <HorizontalFilter
            levels={levels}
            types={types}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
        {response.data.map(item => (
          <Card
            key={item._id}
            coverImg={item.coverImg}
            name={item.name}
            description={item.description}
            CEFR={item.CEFR}
            _id={item._id}
            type={item.type}
            ratingStarAverage={item.ratingStarAverage}
            author={item.author}
            setFormData={setFormData}
          />
        ))}
        <Pagination
          className="tw-col-span-full tw-mt-8"
          current={+formData.current}
          pageSize={+formData.pageSize}
          total={response.total}
          onChange={onPaginationChange}
        />
      </div>
    </div>
  )
}

export default Library
