import './rating.scss'
import { Divider } from 'antd';
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import Translation from '../../../../services/multi-language';
import TotalRating from './totalRating';
import RatingComment from './ratingComment';

function Rating({ rootDetail }) {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  const [starFilter, setStarFilter] = useState([]);
  const [totalRatingNumber, setTotalRatingNumber] = useState(0);
  const handleStarFilterChange = (newStarFilter) => {
    setStarFilter(newStarFilter);
  }
  return (
    <div className="box">
      <Divider orientation="left"><p className="tw-text-xl tw-m-0">{t("rating.studentFeedback")}</p></Divider>
      <TotalRating
        materialId={rootDetail._id}
        materialName={rootDetail.name}
        materialDescription={rootDetail.description}
        materialRatingStarAverage={rootDetail.ratingStarAverage}
        setStarFilter={handleStarFilterChange}
        starFilter={starFilter}
        totalRatingNumber={totalRatingNumber}
      />
      <hr />
      <div>
        <RatingComment
          materialId={rootDetail._id}
          starFilter={starFilter}
          totalRatingNumber={totalRatingNumber}
          setTotalRatingNumber={setTotalRatingNumber}
          setStarFilter={setStarFilter}
        />
      </div>
    </div>
  )
}

export default Rating
