import React from "react";
import {
  Progress, Button, Row, Col, Rate,
} from "antd";
import "./books.scss";
import Translation from '../../../../services/multi-language';

function BookRow(props) {
  const { t } = Translation();

  const { material, numberOfLeafTotal, LeafDone } = props;
  const { coverImg } = material;
  // console.log('leafDone', LeafDone);
  const donePercent = Math.round((LeafDone.length / numberOfLeafTotal) * 100 * 100) / 100;
  let ratingRound = Math.round(material.ratingStarAverage * 100) / 100;
  if (Number.isNaN(ratingRound)) { ratingRound = 0 }
  let { ratingCount } = material;
  if (Number.isNaN(ratingCount) || !ratingCount) { ratingCount = 0 }
  const stars = <Rate allowHalf defaultValue={ratingRound} disabled />

  let imglink = `${process.env.REACT_APP_API_URL}/materials/images/${coverImg}`
  if (!coverImg) {
    imglink = `${process.env.REACT_APP_API_URL}/materials/images/default.png`
  }

  return (
    <Row className="tw-shadow-md tw-border-b-black tw-h-42 tw-w-100 tw-m-2 tw-rounded-md tw-text-left">
      <Col span={16}>
        <span className="book-image-container tw-inline-block tw-ml-4 tw-mt-4 tw-mb-2 tw-pb-2">
          <span className="book-image-container-child tw-bg-green-500 tw-rounded-md tw-inline-block tw-w-40 tw-h-28">
            <img src={imglink} className="book-image tw-w-full tw-max-h-full" alt="book" />
          </span>
          <span className="star-rating tw-inline-block tw-ml-2 tw-text-yellow-300 tw-w-72 tw-mt-1">
            <span className="tw-text-secondary tw-text-lg">{stars}</span>
            <span className="tw-inline-flex tw-font-semibold tw-text-gray-500 tw-ml-2">
              {' '}
              (
              {ratingRound}
              )
              <span className="filler tw-w-3 tw-inline-flex tw-h-0" />

              <b className="tw-text-black tw-font-medium">
                {' '}
                {ratingCount}
                {' '}
                {t('history.ratings')}
              </b>
            </span>

          </span>
        </span>
        <span className="book-title  tw-inline-block tw-ml-4 tw-w-64 tw-relative tw-bottom-12">
          <h1 className="tw-font-semibold tw-text-2xl">
            {material.name}
          </h1>
          <h2 className="tw-text-gray-500 tw-text-xl">
            {' '}
            {t('history.level')}
            -
            {' '}
            {material.CEFR}
          </h2>
        </span>
      </Col>
      <Col className=" tw-text-center align-middle" span={4}>
        <span className="tw-book-progress tw-inline-block tw-mt-0 tw-relative tw-top-12">
          <Progress className="" percent={donePercent} strokeColor="#2C4073" type="circle" strokeWidth={7} width={70} />
        </span>
      </Col>
      <Col className=" tw-text-center align-middle" span={4}>
        <span className="buttons-container tw-relative tw-top-52 tw-right-12 md:tw-top-16 md:tw-right-0 tw-bg-teal-700 ">
          <Button onClick={() => window.location.assign(`/root-detail/${material._id}`)} className="button-continue  tw-rounded-md tw-bg-primary tw-text-white hover:tw-bg-slate-50 hover:tw-text-primary">
            {t('history.continue')}
          </Button>
        </span>
      </Col>
    </Row>
  );
}
export default BookRow;
