/* eslint-disable */
import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { Button } from "antd";
import { useSelector } from "react-redux";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import Translation from "../../services/multi-language";
import congratulations from "../../assets/animation/congratulation.json";
import "./CheckPoint.scss";
import DemoButton from "../../components/demoButton";

import recordApi from "../../api/recordApi";
import materialApi from "../../api/materialApi";
import assignmentApi from "../../api/assignmentApi";
import {
  MiddlePercent,
  GoodPercent,
  PerfectPercent,
  ExcellentPercent,
} from "../../constant";

const getStatusByRatio = (percent) => {
  if (percent >= MiddlePercent && percent < GoodPercent) {
    return "middle";
  }
  if (percent >= GoodPercent && percent < ExcellentPercent) {
    return "good";
  }
  if (percent >= ExcellentPercent && percent < PerfectPercent) {
    return "excellent";
  }
  if (percent >= PerfectPercent) {
    return "perfect";
  }
  return "bad";
};

function CheckPoint() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userid = user?._id || user?.id;

  const { recordId } = useParams();
  const [searchParams] = useSearchParams();
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  const navigate = useNavigate();
  const [point, setPoint] = useState({
    total: 0,
    correct: 0,
    status: "",
  });
  const [record, setRecord] = useState(false);
  const [assignment, setAssignment] = useState(undefined);
  useEffect(() => {
    if (searchParams.get("isMobile")) {
      ChangeLanguage("en");
    } else ChangeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const getAllExercises = async () => {
      try {
        const response = await recordApi.getRecordById(recordId);
        setRecord(response);
        let total = 0;
        let correctNumber = 0;
        response?.children[0].userAnswer.forEach(({ content }) => {
          content?.status?.forEach(({ correct }) => {
            if (correct) {
              correctNumber += 1;
            }
            total += 1;
          });
        });
        setPoint({
          total,
          correct: correctNumber,
          status: getStatusByRatio(correctNumber / total),
        });
      } catch (error) {
        // console.log("Failed to fetch checkpoint list: ", error);
      }
    };
    getAllExercises();
  }, []);

  useEffect(() => {
    const getAssignment = async () => {
      try {
        const response = await assignmentApi.getOneAssignment({
          student: userid,
          material: record.parent,
        });
        setAssignment(response.data);
        // console.log('assignment', response);
        // console.log(assignment);
        if (response.data === null) setAssignment(undefined);
      } catch (error) {
        // console.log("Failed to fetch checkpoint list: ", error);
      }
    };
    getAssignment();
  }, [record]);
  const navigateWithQuery = (path) => {
    // navigate(`${path}?${searchParams.get('isMobile') ? 'isMobile=true' : ''}`);
    // HA's old code cause error that in url to history page, there is a '?' at the end of url, so I change it to this
    if (searchParams.get("isMobile")) {
      navigate(`${path}?isMobile=true`);
    } else navigate(path);
  };
  // navigate review
  // navigate next
  const handleNext = async () => {
    try {
      const nextLesson = await materialApi.getNextMaterial({
        root: record?.root,
        parent: record?.parent,
        current: record?.children[0].exerciseId,
      });
      navigateWithQuery(`/exercise/${nextLesson?._id}`);
    } catch (error) {
      if (record?.root === record?.children[0].exerciseId) {
        navigateWithQuery(`/library`);
      } else navigateWithQuery(`/root-detail/${record?.root}`);
      // console.log("Failed to fetch checkpoint list: ", error);
    }
  };
  // navigate history
  const handleHistory = () => {
    navigateWithQuery(`/history/details/currentuser?current=1&pageSize=12`);
  };
  // navigate rootdetail
  const handleRootDetail = () => {
    navigateWithQuery(`/root-detail/${record?.root}`);
  };
  // load animation
  useEffect(() => {
    let instance = {
      destroy: () => {},
    };
    // console.log(point.correct / point.total)
    if (point.correct / point.total >= MiddlePercent) {
      instance = lottie.loadAnimation({
        container: document.getElementById("check-point__background"),
        animationData: congratulations,
        renderer: "svg", // "canvas", "html"
        loop: true, // boolean
        autoplay: true, // boolean
      });
    }
    return () => instance?.destroy();
  }, [point]);
  return (
    <>
      <div className="check-point__background" id="check-point__background" />
      <div className="check-point box">
        <div className="check-point__content">
          {assignment?.publicScore || assignment === undefined ? (
            <h1 className="check-point__title">
              {t(`checkpoint.${point.status}`)}
            </h1>
          ) : (
            <h1 className="check-point__title">{t(`checkpoint.private`)}</h1>
          )}

          <div className="check-point__point">
            {assignment?.canReview || assignment === undefined ? (
              <Link to={`/exercise/review?recordId=${recordId}`}>
                <DemoButton title={t("checkpoint.review")} />
              </Link>
            ) : (
              <span style={{ opacity: 0 }}>
                <DemoButton className="tw-opacity-0" />
              </span>
            )}
            <div
              className={`check-point__point__detail background--${
                assignment?.publicScore || assignment === undefined
                  ? point.status
                  : "private"
              }`}
            >
              {assignment?.publicScore || assignment === undefined ? (
                <p className="text">{t("checkpoint.point")}</p>
              ) : (
                <p className="text">&nbsp;</p>
              )}
              <p className="point">
                {assignment?.publicScore || assignment === undefined ? (
                  <>
                    {" "}
                    {point.correct} / {point.total}{" "}
                  </>
                ) : (
                  <img
                    className="tw-w-32"
                    src="../assets/images/smile.png"
                    alt="smile"
                  />
                )}
              </p>
            </div>
            <button type="button" onClick={handleNext}>
              <DemoButton right title={t("checkpoint.next")} />
            </button>
          </div>
          <div className="check-point__point--small">
            <div className="check-point__point__detail">
              {assignment?.publicScore || assignment === undefined ? (
                <p className="text">{t("checkpoint.point")}</p>
              ) : (
                ""
              )}
              <p className="point">
                {assignment?.publicScore || assignment === undefined ? (
                  <>
                    {" "}
                    {point.correct} / {point.total}{" "}
                  </>
                ) : (
                  <img
                    className="tw-w-32 tw-relative tw-top-5"
                    src="../assets/images/smile.png"
                    alt="smile"
                  />
                )}
              </p>
            </div>
            <div className="check-point__point--small buttons">
              <Link to={`/exercise/review?recordId=${recordId}`}>
                <DemoButton title={t("checkpoint.review")} />
              </Link>
              <button type="button" onClick={handleNext}>
                <DemoButton right title={t("checkpoint.next")} />
              </button>
            </div>
          </div>
          <div className="check-point__button">
            {!searchParams.get("isMobile") && (
              <>
                <Button
                  type="primary"
                  className="btn btn--primary"
                  onClick={handleHistory}
                >
                  {t("checkpoint.history")}
                </Button>
                <Button
                  type="primary"
                  className="btn btn--primary"
                  onClick={handleRootDetail}
                >
                  {t("checkpoint.book")}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckPoint;
