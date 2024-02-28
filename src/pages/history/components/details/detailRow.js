import React, { useEffect } from "react";
import { Col, Row, Button } from 'antd';
import { Link } from "react-router-dom";
import classNames from "classnames";
import Translation from '../../../../services/multi-language';
import recordApi from "../../../../api/recordApi";

function DetailRow(props) {
  const { t } = Translation();
  // const navigate = useNavigate();
  const { record } = props;
  const {
    parent, root, children,
  } = record;
  const { coverImg } = root
  // data handle here
  let score = 0;
  let totalScore = 0;
  children[0].userAnswer.forEach((ans) => {
    let thisAswerScore = 0;
    let totalOfThisAnswer = 0;
    ans?.content?.status.forEach((stt) => {
      if (stt.correct) {
        thisAswerScore += 1;
      }
      totalOfThisAnswer += 1;
    })
    score += thisAswerScore;
    totalScore += totalOfThisAnswer;
  });
  let imglink = `${process.env.REACT_APP_API_URL}/materials/images/${coverImg}`
  if (!coverImg) {
    imglink = `${process.env.REACT_APP_API_URL}/materials/images/default.png`
  }
  const timeFormat = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  if (parent === 'undefined' || parent === null) {
    // console.log('parent is undefined', props)
  }

  const [doTimes, setDoTimes] = React.useState(0);
  const [assignment, setAssignment] = React.useState(null);
  useEffect(() => {
    const getDoTimes = async () => {
      try {
        const myResponse = await recordApi.getDoTimes(parent?._id, record?.userId);
        setDoTimes(myResponse.data);
      } catch (err) {
        // console.log(err)
      }
    }
    getDoTimes();
  }, [parent?._id])

  useEffect(() => {
    const getAssignment = async () => {
      try {
        const myResponse = await recordApi.getOneAssignment({
          material: parent?._id,
          student: record?.userId,
        });
        setAssignment(myResponse);
        // console.log('myResponse', myResponse)
      } catch (err) {
        // console.log(err)
      }
    }
    getAssignment();
  }, [record?.userId])
  const today = new Date(); // get current date
  const deadline = new Date(assignment?.data?.deadline); // get deadline date

  const isOverdue = today > deadline;

  return (
    <Row className="details-history-row tw-h-24 tw-my-2 tw-text-xs md:tw-text-sm lg:tw-text-base">
      <Col span={7} className="book tw-align-middle tw-flex tw-text-left tw-m-0 tw-m-[0.4%] tw-rounded-md tw-bg-gray-100 ">
        <span className="img-container tw-hidden lg:tw-block tw-rounded-md tw-w-48 tw-h-16 tw-overflow-hidden tw-mt-2 tw-ml-2">
          <span className="book-image-container-child tw-bg-green-500 tw-rounded-md tw-inline-block tw-w-32">
            <img src={imglink} className="tw-w-full tw-h-full" alt="book" />
          </span>
        </span>
        <span className=" book-title tw-inline tw-ml-4 tw-w-64">
          <h1 className="tw-h-10  tw-font-semibold tw-text-xs tw-relative tw-top-2">
            {root.name}
          </h1>
          <h2 className="tw-text-gray-500 tw-text-xs">
            {' '}
            {t('history.level')}
            {' '}
            -
            {' '}
            {root.CEFR}
          </h2>
        </span>
      </Col>
      <Col span={5} className="ex-title tw-align-middle tw-pt-2 tw-m-0 tw-m-[0.4%] tw-inline-block tw-rounded-md tw-bg-gray-100">
        <h1 className="tw-font-semibold tw-text-xs md:tw-text-sm lg:tw-text-base tw-relative tw-top-2">
          {parent?.name}
          <p className={classNames({ "tw-hidden": !(parent === 'undefined' || parent === null) })}>Lost name</p>
        </h1>
      </Col>
      <Col span={4} className="time tw-align-middle tw-pt-2 tw-m-0 tw-m-[0.4%] tw-rounded-md">
        <p className="tw-text-black tw-text-xs md:tw-text-sm lg:tw-text-base tw-relative tw-top-2">{timeFormat(record.time)}</p>
      </Col>
      <Col span={2} className="book-score tw-align-middle tw-pt-2 tw-m-0 tw-m-[0.4%] tw-rounded-md tw-bg-gray-100">
        {(assignment?.data?.publicScore || !assignment?.data) && (
          <p className="tw-text-black tw-text-xs md:tw-text-sm lg:tw-text-base tw-relative tw-top-2">
            <b className="tw-text-primary">{score}</b>
            /
            <b className="">{totalScore}</b>
          </p>
        )}
      </Col>

      <Col span={5} className="book-action tw-m-[0.4%] tw-rounded-md tw-bg-gray-100 tw-flex tw-flex-wrap tw-items-center">
        {((assignment?.data?.redoTimes > doTimes - 1 || !assignment?.data) && !isOverdue) && (
          <Link className="tw-w-[90%] md:tw-w-[45%]" to={`/exercise/${record.children[0].exerciseId}`}>
            <Button
              className="tw-w-[80%] tw-mx-[15%] tw-rounded-md tw-bg-primary tw-text-white hover:tw-bg-slate-50 hover:tw-text-primary"
            >
              {t('history.redo')}
            </Button>
          </Link>
        )}
        {(assignment?.data?.canReview || !assignment?.data) && (
          <Link className="tw-w-[90%] md:tw-w-[45%]" to={`/exercise/${record.children[0].exerciseId}?recordId=${record._id}`}>
            <Button
              className="tw-w-[80%] tw-mx-[15%] tw-rounded-md tw-bg-secondary tw-text-white hover:tw-bg-slate-50 hover:tw-text-primary"
            >
              {t('history.review')}
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  );
}
export default DetailRow;
