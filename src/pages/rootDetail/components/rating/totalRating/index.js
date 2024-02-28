/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import "./totalRating.scss";
import {
  Col, Row, Rate, Progress,
} from 'antd';
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import Translation from '../../../../../services/multi-language';
import ratingApi from '../../../../../api/ratingApi';
import RatingStarFilterList from "../ratingStar";

function TotalRating({
  materialId,
  materialName,
  materialDescription,
  materialRatingStarAverage,
  setStarFilter, starFilter,
  totalRatingNumber,
}) {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  const [fiveStarRatio, setFiveStarRatio] = useState(0);
  const [fourStarRatio, setFourStarRatio] = useState(0);
  const [threeStarRatio, setThreeStarRatio] = useState(0);
  const [twoStarRatio, setTwoStarRatio] = useState(0);
  const [oneStarRatio, setOneStarRatio] = useState(0);
  const materialInformationResponsive = {
    xs: 0,
    sm: 0,
    md: 0,
    xl: 6,
    xxl: 6,
  }

  const materialRatingResponsive = {
    xs: 24,
    sm: 24,
    md: 24,
    xl: 18,
    xxl: 18,
  }

  const startRatingResponsive = {
    xs: 20,
    sm: 16,
    md: 16,
    xl: 10,
    xxl: 10,
  }

  const startAverageRatingResponsive = {
    xs: 8,
    sm: 6,
    md: 4,
    xl: 4,
    xxl: 4,
  }

  useEffect(() => {
    const getFiveStarRatio = async () => {
      try {
        const response = await ratingApi.getStarRatio({ materialId, starValue: 5 });
        if (response.data !== 0) setFiveStarRatio(response);
      } catch (error) {
        // console.log("Failed to fetch star ratio list: ", error);
      }
    }
    if (materialId) getFiveStarRatio();
  }, [materialId])
  useEffect(() => {
    const getFourStarRatio = async () => {
      try {
        const response = await ratingApi.getStarRatio({ materialId, starValue: 4 });
        if (response.data !== 0) setFourStarRatio(response);
      } catch (error) {
        // console.log("Failed to fetch star ratio list: ", error);
      }
    }
    if (materialId) getFourStarRatio();
  }, [materialId])
  useEffect(() => {
    const getThreeStarRatio = async () => {
      try {
        const response = await ratingApi.getStarRatio({ materialId, starValue: 3 });
        if (response.data !== 0) setThreeStarRatio(response);
      } catch (error) {
        // console.log("Failed to fetch star ratio list: ", error);
      }
    }
    if (materialId) getThreeStarRatio();
  }, [materialId])
  useEffect(() => {
    const getTwoStarRatio = async () => {
      try {
        const response = await ratingApi.getStarRatio({ materialId, starValue: 2 });
        if (response.data !== 0) setTwoStarRatio(response);
      } catch (error) {
        // console.log("Failed to fetch star ratio list: ", error);
      }
    }
    if (materialId) getTwoStarRatio();
  }, [materialId])
  useEffect(() => {
    const getOneStarRatio = async () => {
      try {
        const response = await ratingApi.getStarRatio({ materialId, starValue: 1 });
        if (response.data !== 0) setOneStarRatio(response);
      } catch (error) {
        // console.log("Failed to fetch star ratio list: ", error);
      }
    }
    if (materialId) getOneStarRatio();
  }, [materialId])

  useEffect(() => {
    const allRateId = ["1", "2", "3", "4", "5"];
    allRateId.forEach((id) => {
      const element = document.getElementById(id);
      if (starFilter.includes(parseInt(id, 10))) {
        element.classList.add("tw-bg-third");
        element.classList.add("tw-bg-opacity-60");
        element.classList.add("tw-rounded-full");
      } else {
        element.classList.remove("tw-bg-third");
        element.classList.remove("tw-bg-opacity-60");
        element.classList.remove("tw-rounded-full");
      }
    })
  }, [starFilter])

  const handleFilterOnClick = (id) => {
    if (!starFilter.includes(id)) {
      const tempArray = [...starFilter];
      tempArray.push(id);
      tempArray.sort();
      tempArray.reverse();
      setStarFilter(tempArray);
    } else {
      const tempArray = [...starFilter];
      const index = tempArray.indexOf(id);
      tempArray.splice(index, 1);
      setStarFilter(tempArray);
    }
  }

  const clearFilterHandle = () => {
    setStarFilter([]);
  }

  return (
    <div>
      <Row justify="space-between">
        <Col {...materialRatingResponsive}>
          <Row className="sm:tw-justify-between lg:tw-justify-start">
            <Col {...startAverageRatingResponsive}>
              <p className="tw-text-secondary tw-brightness-[.85] tw-text-8xl tw-mb-0 tw-font-bold tw-text-center">
                {materialRatingStarAverage?.toFixed(1)}
              </p>
              <Rate disabled allowHalf value={Math.round(materialRatingStarAverage / 0.5) * 0.5} className="tw-text-base tw-ml-2" />
              <p className="tw-text-primary tw-mt-2 tw-text-8 tw-font-bold tw-pl-4">{t('rating.materialRating')}</p>
            </Col>
            <Col offset={2} {...startRatingResponsive}>
              <Row justify="space-between" className="hover:tw-cursor-pointer tw-my-1" onClick={() => { handleFilterOnClick(5) }} id="5">
                <Col span={10}>
                  <Progress percent={Number(fiveStarRatio)?.toFixed(0)} status="normal" className="tw-inline-block progress-filter tw-ml-3 tw-mt-0.5" />
                </Col>
                <Col span={10}>
                  <Rate defaultValue={5} disabled className="tw-inline-block" />
                </Col>
              </Row>
              <Row justify="space-between" className="hover:tw-cursor-pointer tw-my-1" onClick={() => { handleFilterOnClick(4) }} id="4">
                <Col span={10}>
                  <Progress percent={Number(fourStarRatio)?.toFixed(0)} status="normal" className="tw-inline-block progress-filter tw-ml-3 tw-mt-0.5" />
                </Col>
                <Col span={10}>
                  <Rate defaultValue={4} disabled className="tw-inline-block" />
                </Col>
              </Row>
              <Row justify="space-between" className="hover:tw-cursor-pointer tw-my-1" onClick={() => { handleFilterOnClick(3) }} id="3">
                <Col span={10}>
                  <Progress percent={Number(threeStarRatio)?.toFixed(0)} status="normal" className="tw-inline-block progress-filter tw-ml-3 tw-mt-0.5" />
                </Col>
                <Col span={10}>
                  <Rate defaultValue={3} disabled className="tw-inline-block" />
                </Col>
              </Row>
              <Row justify="space-between" className="hover:tw-cursor-pointer tw-my-1" onClick={() => { handleFilterOnClick(2) }} id="2">
                <Col span={10}>
                  <Progress percent={Number(twoStarRatio)?.toFixed(0)} status="normal" className="tw-inline-block progress-filter tw-ml-3 tw-mt-0.5" />
                </Col>
                <Col span={10}>
                  <Rate defaultValue={2} disabled className="tw-inline-block" />
                </Col>
              </Row>
              <Row justify="space-between" className="hover:tw-cursor-pointer tw-my-1" onClick={() => { handleFilterOnClick(1) }} id="1">
                <Col span={10}>
                  <Progress percent={Number(oneStarRatio)?.toFixed(0)} status="normal" className="tw-inline-block progress-filter tw-ml-3 tw-mt-0.5" />
                </Col>
                <Col span={10}>
                  <Rate defaultValue={1} disabled className="tw-inline-block" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col {...startAverageRatingResponsive}>
              <Row>
                <p className="tw-text-black tw-text-lg tw-mb-0 tw-uppercase">{t('rating.filteredBy')}</p>
              </Row>
              <Row>
                <p className="tw-text-primary hover:tw-cursor-pointer tw-text-lg" onClick={clearFilterHandle} onKeyDown={clearFilterHandle}>{t('rating.clearFilter')}</p>
              </Row>
              <Row>
                <p className="tw-text-black">
                  {totalRatingNumber}
                  {' '}
                  {t('rating.totalRating')}
                </p>
              </Row>
            </Col>
            <Col offset={2} {...startRatingResponsive}>
              <RatingStarFilterList starFilter={starFilter} />
            </Col>
          </Row>
        </Col>
        <Col {...materialInformationResponsive}>
          <div
            className=""
            style={{
              textAlign: 'right',
            }}
          >
            <p className="tw-text-primary tw-text-3xl tw-font-bold tw-truncate">
              {materialName}
            </p>
            <p className="tw-line-clamp-4">
              {materialDescription}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TotalRating;
