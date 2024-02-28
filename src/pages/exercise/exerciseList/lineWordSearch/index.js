import React, {
  useEffect, useState,
} from "react"
import ExcerciseCard from "../exerciseCard"
import ExerciseType from "../../../../services/exerciseType"
import HintBox from "./components/hintBox";
import LineWordSearchComponent from "./components/lineWordSearchComponent";

function LineWordSearch({
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const [questionDetail, setQuestionDetail] = useState(detail);
  //  For user answer
  const updateUserAnswer = (userInput) => {
    const tempDetail = questionDetail;
    tempDetail.answers = tempDetail.answers ? tempDetail.answers : [];
    if (tempDetail.answers.some((e) => e.questionId === userInput.questionId)) {
      for (let i = 0; i < tempDetail.answers.length; i += 1) {
        if (tempDetail.answers[i].questionId === userInput.questionId) {
          tempDetail.answers[i] = userInput;
        }
      }
    } else {
      tempDetail.answers.push(userInput);
    }
    setQuestionDetail(tempDetail);
  }

  //  For hint box
  const [hint, setHint] = useState([]);

  //  Handle submit
  useState(() => {
    if (signalToSubmit) {
      handleCollectingData({ ...detail, answers: questionDetail.answers });
    }
  }, [signalToSubmit])

  useEffect(() => {
    setHint(detail.questionArray.map((element) => element.findWord))
  }, [])
  return (
    <ExcerciseCard title={title} id={exId} className="tw-relative" exerciseType={ExerciseType.LineWordSearch.type} exerciseAudio={exerciseAudio}>
      {hint.length && <HintBox hintInfo={hint} />}
      <div className="tw-flex tw-flex-wrap tw-w-full tw-justify-around tw-items-stretch">
        {detail.questionArray.map((element) => (
          <LineWordSearchComponent
            questionContent={element}
            key={element.questionId}
            updateUserAnswer={updateUserAnswer}
            isDoingMode={isDoingMode}
            status={status}
          />
        ))}
      </div>
    </ExcerciseCard>
  )
}
export default LineWordSearch;
