import React, { useEffect, useState } from "react"
import {
  Row, Col, Rate,
} from 'antd';
import { useSelector } from 'react-redux';
import { CrownOutlined } from '@ant-design/icons';
import Translation from "../../../../services/multi-language";
import "./topBanner.scss"
import recordApi from '../../../../api/recordApi'

function TopBanner({ book, userId }) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  const [peoAlsoLean, setPeoAlsoLean] = useState(null);
  useEffect(() => {
    const getPeopleAlsoLearn = async () => {
      try {
        const res = await recordApi.getPeopleAlsoLearn(book.current._id, userId)
        // console.log(res)
        setPeoAlsoLean(res)
      } catch (err) {
        // console.log(err)
      }
    }
    if (book.current && book.current._id && userId) getPeopleAlsoLearn()
  }, [book.current])

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  const bookData = book.current;
  // console.log('book', bookData)
  // // console.log('bookData', new Date(bookData.timeCreate))
  if (!bookData) {
    return (
      <div />
    )
  }

  return (
    <Row gutter={[16, 16]} className="tw-w-full tw-py-8">
      {/* banner left */}
      <Col md={12} sm={24}>
        <div className="tw-bg-pridmary">
          <Row>
            <Col span={24}>
              <div className="tw-text-black tw-text-2xl">
                Let&apos;s learn together !!!
              </div>
            </Col>
            <Col span={24}>
              <div className="tw-text-primary tw-text-4xl tw-font-bold tw-py-2">
                {bookData.name}
              </div>
            </Col>
            <Col span={24}>
              <div className="tw-text-xl">
                {bookData.description}
              </div>
            </Col>
            <Col span={24} className="tw-py-3">
              <div className="">
                <CrownOutlined />
                {' '}
                {t('exercise.level')}
                &#58;
                &nbsp;
                {bookData.CEFR}
              </div>
              {/* <div className="">
                <AlertOutlined />
                {' '}
                {t('exercise.lastUpdate')}
                &#58;
                &nbsp;
                8/2022
              </div> */}
            </Col>
            <Col span={24}>
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-items-center">
                  <span className="tw-text-gray-400 tw-leading-none tw-mr-2">
                    {bookData.ratingStarAverage?.toFixed(1)}
                  </span>
                  <Rate disabled defaultValue={bookData.ratingStarAverage?.toFixed(1)} className="tw-text-xs tw-mr-2" />
                  <span className="tw-leading-none tw-mx-2 tw-text-primary">
                    {bookData.ratingCount}
                    &nbsp;
                    {t('exercise.rating')}
                  </span>
                  <span className="tw-text-gray-400 tw-leading-none tw-mx-2">
                    {peoAlsoLean?.total}
                    &nbsp;
                    {t('exercise.student')}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      {/* banner right */}
      <Col md={12} className="xs:tw-hidden">
        <div className="book-background">
          <div className="book-background__bot bg-primary" />
          <div className="book-background__mid">
            <img className="book-background__mid__image" src={`${process.env.REACT_APP_API_URL}/materials/images/${bookData.coverImg}`} alt="book" />
          </div>
          <div className="book-background__top bg-second-primary" />
        </div>
      </Col>
    </Row>
  )
}

export default TopBanner;
