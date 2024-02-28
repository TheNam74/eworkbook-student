import React, { useEffect } from "react";
import {
  Button, Row, Col,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import "./assignments.scss";
import moment from "moment";
import Translation from '../../services/multi-language';
import materialApi from "../../api/materialApi";
import assignmentApi from "../../api/assignmentApi";
import recordApi from "../../api/recordApi";

function AssignmentRow(props) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userid = user?._id || user?.id;

  const { t } = Translation();
  const { material, deadline } = props;
  // const { LeafDone } = material;
  const coverImg = material?.coverImg;
  const [assignment, setAssignment] = React.useState(undefined);
  const [doTimes, setDoTimes] = React.useState(0);
  useEffect(() => {
    const getDoTimes = async () => {
      try {
        const myResponse = await recordApi.getDoTimes(material?._id, userid);
        setDoTimes(myResponse.data);
        // console.log('dotime', myResponse.data);
      } catch (err) {
        // console.log(err)
      }
    }
    getDoTimes();
  }, [material?._id])

  const navigate = useNavigate()

  // console.log('leafDone', LeafDone);

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

  async function onClickDoAssign() {
    try {
      const response = await materialApi.getRootMaterial(material._id)
      if (response.children?.length > 0) {
        navigate(`/root-detail/${material._id}`)
      } else if (material.type !== 'Exam') {
        navigate(`/exercise/${material._id}`)
      } else {
        navigate(`/exam/${material._id}`)
      }
    } catch (error) {
      // console.log('Failed to fetch root detail: ', error)
    }
  }
  useEffect(() => {
    const getAssignment = async () => {
      try {
        const response = await assignmentApi.getOneAssignment({
          student: userid, material: material._id,
        });
        setAssignment(response.data)
        // console.log('assignment', response);
        // console.log(assignment);
        if (response.data === null) setAssignment(undefined);
      } catch (error) {
        // console.log("Failed to fetch checkpoint list: ", error);
      }
    };
    getAssignment();
  }, [material]);

  const currentTime = new Date();

  // assignment.deadline is a string yyyy-mm-dd hh:mm:ss, need to convert to date
  const deadlineTime = moment(assignment?.deadline, "YYYY-MM-DD HH:mm:ss").toDate();

  const isOverdue = currentTime > deadlineTime;
  return (
    <Row className="tw-shadow-md tw-border-b-black tw-h-42 tw-w-100 tw-m-2 tw-rounded-md tw-text-left">
      <Col span={16}>
        <span className="book-image-container tw-inline-block tw-ml-4 tw-mt-4 tw-mb-2 tw-pb-2">
          <span className="book-image-container-child tw-bg-green-500 tw-rounded-md tw-inline-block tw-w-40 tw-h-28">
            <img src={imglink} className="book-image tw-w-full tw-max-h-full" alt="book" />
          </span>
          <span className="star-rating tw-inline-block tw-ml-2 tw-text-yellow-300 tw-w-72 tw-mt-1">
            <span className="tw-text-base tw-text-black tw-italic">Author: Tung Nguyen</span>
          </span>
        </span>
        <span className="book-title  tw-inline-block tw-ml-4 tw-w-64 tw-relative tw-bottom-12">
          <h1 className="tw-font-semibold tw-text-2xl">
            {material?.name}
          </h1>
          {(material?.CEFR ? (
            <h2 className="tw-text-gray-500 tw-text-xl">
              {' '}
              {t('history.level')}
              -
              {' '}
              {material.CEFR}
            </h2>
          ) : (
            <h2 className="tw-text-gray-500 tw-text-xl">
              &nbsp;
            </h2>
          ))}
        </span>
      </Col>
      <Col className=" tw-text-center align-middle" span={4}>
        <span className="tw-book-progress tw-inline-block tw-mt-0 tw-relative tw-top-12">
          {deadline ? (
            <p className="tw-text-base tw-pt-4 tw-text-black">
              {' '}
              {timeFormat(deadline)}
              {' '}
            </p>
          ) : (
            <p className="tw-text-base tw-pt-4 tw-text-black">
              {' '}
              {t('history.noDeadline')}
              {' '}
            </p>
          )}
        </span>
      </Col>
      <Col className=" tw-text-center align-middle" span={4}>
        <span className="buttons-container tw-relative tw-top-52 tw-right-12 md:tw-top-16 md:tw-right-0 tw-bg-teal-700 ">
          {(!isOverdue && doTimes < assignment?.redoTimes) && (
            <Button onClick={async () => onClickDoAssign()} className="button-continue  tw-rounded-md tw-bg-primary tw-text-white hover:tw-bg-slate-50 hover:tw-text-primary">
              {t('history.do')}
            </Button>
          )}
        </span>
      </Col>
    </Row>
  );
}
export default AssignmentRow;
