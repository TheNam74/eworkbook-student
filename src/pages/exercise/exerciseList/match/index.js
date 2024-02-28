import "./match.scss"
import {
  Button, Col, Row,
} from 'antd'
import React, { useState, useEffect } from 'react'
// import isArray from "lodash/isArray"
import ExerciseType from "../../../../services/exerciseType"
import MatchCol from './components/matchCol'
import ExcerciseCard from "../exerciseCard"
import LineMatchList from "./components/lineMatchList"

const matchButtonBK = {}
function Match({
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const [colCanChoose, setColCanChoose] = useState(0);
  const [sideCanChoosse, setSideCanChoose] = useState("");
  const [matchButton, setMatchButton] = useState([]);
  const [newPair, setNewPair] = useState([]);
  const [chooseOneCol, setChooseOneCol] = useState(false);
  const [clear, setClear] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [quiz, setQuiz] = useState(detail);
  const [isWindowResize, setIsWindowResize] = useState(false);

  const clearButton = () => {
    setMatchButton([]);
    setClear(!clear);
  }

  const functionUpdateColCanChoose = () => {
    if (!chooseOneCol) {
      setColCanChoose(0);
      setSideCanChoose("");
    }
  }
  useEffect(functionUpdateColCanChoose, [chooseOneCol]);
  useEffect(() => {
    if (!isDoingMode) {
      setIsHidden(true);
    }
  }, [isDoingMode]);

  const chooseNewOne = (id) => {
    if (newPair.length === 0) {
      const temp = [];
      temp.push(id);
      setNewPair(temp);
      setChooseOneCol(true);
      if (id[2] === "R") {
        setColCanChoose(Number(id[0]) + 1);
        setSideCanChoose("L");
      } else {
        setColCanChoose(Number(id[0]) - 1);
        setSideCanChoose("R");
      }
    } else {
      const tempNewPair = newPair;
      tempNewPair.push(id);
      tempNewPair.sort();
      const tempMatchButton = matchButton;
      tempMatchButton.push(
        {
          first: tempNewPair[0],
          second: tempNewPair[1],
        },
      );
      tempMatchButton.sort();
      setMatchButton(tempMatchButton);
      matchButtonBK[exId] = tempMatchButton;
      setNewPair([]);
      setChooseOneCol(false);
    }
  }
  useEffect(() => {
    if (signalToSubmit) {
      try {
        handleCollectingData({ ...detail, userChoice: matchButtonBK[exId] });
        matchButtonBK[exId] = [];
      } catch (error) {
        // console.log(error);
      }
    }
  }, [signalToSubmit]);

  const functionForRender = () => {
    setIsWindowResize(!isWindowResize);
  }

  let timeOutId;
  const windowResizeListenerInMatch = () => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(functionForRender, 500);
  }
  // const genKey = (id) => (`${exId}#${id}`);
  useEffect(() => {
    window.addEventListener('resize', windowResizeListenerInMatch);
    return () => {
      window.removeEventListener('resize', windowResizeListenerInMatch)
    }
  })

  const length = 24 / +quiz.data.length - 1;
  return (
    <ExcerciseCard title={title} id={exId} className="tw-relative" exerciseType={ExerciseType.Match.type} exerciseAudio={exerciseAudio}>
      <div className="center_excercise">
        <Row justify="space-between tw-w-full tw-mb-8">
          {quiz?.data?.map((iData) => (
            <Col offset={1} span={length} key={iData.colKey}>
              <MatchCol
                colKey={iData.colKey}
                colData={iData.colData}
                onChosen={chooseNewOne}
                isOneButtonChoosen={chooseOneCol}
                totalCol={detail.totalCol}
                colCanChoose={colCanChoose}
                sideCanChoosse={sideCanChoosse}
                clear={clear}
                isDoingMode={isDoingMode}
                exId={exId}
              />
            </Col>
            // <div className="tw-flex tw-flex-col">
            // </div>
          ))}
        </Row>
        <Button onClick={clearButton} hidden={isHidden} className="tw-bg-primary tw-text-white tw-rounded-md tw-mt-5">Clear choice</Button>
        <LineMatchList
          matchButton={matchButton}
          isDoingMode={isDoingMode}
          correctAnswer={status}
          exId={exId}
          isWindowResize={isWindowResize}
        />
      </div>
    </ExcerciseCard>
  )
}

export default Match
