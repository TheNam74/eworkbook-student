import React, { useEffect, useState } from "react"
import {
  Row, Col, Progress, Button, Rate, Avatar,
} from "antd"
import classNames from "classnames";
import { useSelector } from 'react-redux'
import Translation from '../../../../services/multi-language';
import './rootBanner.scss'
import recordApi from '../../../../api/recordApi'

function RootBanner({ rootDetail, userData, userId }) {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  const [peoAlsoLean, setPeoAlsoLean] = useState(null);
  const [recordBook, setRecordBook] = useState(null);

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  useEffect(() => {
    const getPeopleAlsoLearn = async () => {
      try {
        const res = await recordApi.getPeopleAlsoLearn(rootDetail._id, userId)
        // console.log(res)
        setPeoAlsoLean(res)
      } catch (err) {
        // console.log(err)
      }
    }
    if (rootDetail && rootDetail._id && userId) getPeopleAlsoLearn()
  }, [rootDetail])
  useEffect(() => {
    const getRecordBook = async () => {
      try {
        const res = await recordApi.getRecordBookByUserIdAndBookId(userId, rootDetail._id)
        // console.log(res)
        setRecordBook(res)
      } catch (err) {
        // console.log(err)
      }
    }
    if (rootDetail && rootDetail._id && userId) getRecordBook()
  }, [rootDetail])

  const coverImg = `${process.env.REACT_APP_API_URL}/materials/images/${rootDetail.coverImg}`
  let donePercent = 0;
  if (recordBook && recordBook.LeafDone) {
    donePercent = Math.round((recordBook.LeafDone.length
      / recordBook.numberOfLeafTotal) * 100);
  }
  return (
    // top banner
    <Row gutter={[0, 16]} className="root-material box">
      {/* top banner - left */}
      <Col lg={10} md={24}>
        <Row gutter={[16, 16]}>
          {/* top banner - left - above text */}
          <Col span={24}>
            <div className="tw-py-4">
              <span className="tw-text-2xl tw-text-black tw-font-thin">Let&apos;s learn together !!!</span>
              <div className="tw-text-4xl tw-font-semibold primary-color tw-py-3">{rootDetail.name}</div>
              <div className="tw-text-base clip-long-text odd-color" data-text={rootDetail.description}>
                {rootDetail.description}
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="tw-flex tw-items-center">
                <span className="tw-text-gray-400 tw-leading-none tw-mr-2">
                  {rootDetail.ratingStarAverage?.toFixed(1)}
                </span>
                <Rate disabled value={Math.round(rootDetail.ratingStarAverage * 2) / 2} className="tw-text-xs tw-mr-2" />
                <a href="#ratingSection">
                  <span className="tw-leading-none tw-mx-2 tw-text-primary">
                    {rootDetail.ratingCount}
                    &nbsp;
                    {t('exercise.rating')}
                  </span>
                </a>
              </div>
            </div>
          </Col>
          {/* top banner - left - infor table */}
          <Col lg={24} md={14}>
            <div className="tw-border tw-rounded-sm tw-p-3 tw-shadow-xl">
              <Row gutter={[4, 20]}>
                <Col xs={24} sm={24} md={16} lg={16}>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <div>
                        <div className="tw-text-base tw-text-black tw-font-normal">{t('rootDetail.level')}</div>
                        <div>{rootDetail.CEFR}</div>
                      </div>
                    </Col>
                    {/* <Col span={12}>
                      <div>
                        <div className="tw-text-base tw-text-black tw-font-normal">{t('rootDetail.totalScore')}</div>
                        <div>
                          <span className="primary-color tw-font-semibold">124</span>
                          /500
                        </div>
                      </div>
                    </Col> */}
                    <Col span={12}>
                      <div>
                        <div className="tw-text-base tw-text-black tw-font-normal">{t('rootDetail.averageScore')}</div>
                        <div>{userData.averageScore}</div>
                      </div>
                    </Col>
                    {/* <Col span={12}>
                      <div>
                        <div className="tw-text-base tw-text-black tw-font-normal">{t('rootDetail.yourRank')}</div>
                        <div>100</div>
                      </div>
                    </Col> */}
                  </Row>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <div className="tw-flex md:tw-flex-col sm:tw-flex-row xs:tw-flex-row  tw-items-center">
                    <Progress
                      className="tw-mb-2 xs:tw-mr-5"
                      type="circle"
                      percent={donePercent}
                      width={60}
                      strokeColor="#FFA54E"
                    />
                    <Button
                      onClick={() => {
                        document.getElementById("tree-data-section").scrollIntoView({
                          behavior: 'auto',
                          block: 'center',
                          inline: 'center',
                        });
                      }}
                      className="tw-bg-primary tw-rounded-md tw-text-white xs:tw-ml-12 continue-btn"
                    >
                      {t('rootDetail.Keeplearning')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={24} md={10} className="tw-py-4 tw-flex tw-flex-col tw-justify-end">
            <div className="users">
              {peoAlsoLean && (
                <>
                  <div className={classNames("users__user", { 'tw-hidden': peoAlsoLean?.recordBooks?.length <= 0 })}>
                    <Avatar src={`${process.env.REACT_APP_API_URL}/users/images/${peoAlsoLean?.recordBooks[0]?.userId?.avatar}`} />
                  </div>
                  <div className={classNames("users__user", { 'tw-hidden': peoAlsoLean?.recordBooks?.length <= 1 })}>
                    <Avatar src={`${process.env.REACT_APP_API_URL}/users/images/${peoAlsoLean?.recordBooks[1]?.userId?.avatar}`} />
                  </div>
                  <div className={classNames("users__user", { 'tw-hidden': peoAlsoLean?.recordBooks?.length <= 2 })}>
                    <Avatar src={`${process.env.REACT_APP_API_URL}/users/images/${peoAlsoLean?.recordBooks[2]?.userId?.avatar}`} />
                  </div>
                </>
              )}
              {peoAlsoLean && (
                <>
                  <i className={classNames("users__others tw-text-xs", { 'tw-hidden': peoAlsoLean?.recordBooks?.length <= 3 || peoAlsoLean?.recordBooks?.length === 0 })}>
                    {t('rootDetail.and')}
                    {' '}
                    {peoAlsoLean ? peoAlsoLean.total - 3 : 0}
                    {' '}
                    {t('rootDetail.otherPeopleAreLearning')}
                  </i>
                  <i className={classNames("users__others tw-text-xs", { 'tw-hidden': peoAlsoLean?.recordBooks?.length > 3 || peoAlsoLean?.recordBooks?.length === 0 })}>
                    {t('rootDetail.areAlsoLearning')}
                  </i>
                </>
              )}

            </div>
          </Col>
        </Row>
      </Col>
      {/* top banner - right */}
      <Col lg={14} md={0} className="tw-pl-12">
        <div className="book-background">
          <div className="book-background__bot bg-primary" />
          <div className="book-background__mid">
            <img className="book-background__mid__image tw-overflow-hidden" src={coverImg} alt="book" />
          </div>
          <div className="book-background__top bg-second-primary" />
        </div>
      </Col>
    </Row>
  )
}

export default RootBanner;
// eslint-disable-next-line block-spacing
// {/* <Row>
//     <span>{rootDetail.ratingStarAverage?.toFixed(1)}</span>
//     <Rate value={Math.round(rootDetail.ratingStarAverage / 0.5) * 0.5} disabled allowHalf className="tw-text-base tw-mx-8" />
//     <a href="#ratingSection">
//       <p className="tw-underline tw-text-primary">
//         (
//         {rootDetail.ratingCount}
//         {' '}
//         ratings)
//       </p>
//     </a>
// </Row> */
