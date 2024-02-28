import React, { useEffect, useState } from "react";
import classNames from "classnames";
import FillBlankQuestion from "./fillBlankQuestion";
import ExcerciseCard from "../exerciseCard";
import ExerciseType from "../../../../services/exerciseType";
import './fillBlank.scss'

function FillBlank({
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const [quizzes, setQuizzes] = useState(detail);
  const collectingData = (data, id) => {
    const newQuestionArray = quizzes.questionArray.map((q) => {
      if (q.questionId === id) {
        q.answer = data;
      }
      return q
    })
    const newQuizzes = { ...quizzes, questionArray: newQuestionArray }
    setQuizzes(newQuizzes)
  }
  const [questionContent, setQuestionContent] = useState();
  useEffect(() => {
    setQuestionContent(detail?.questionArray?.map(
      (q) => {
        const correctKey = status ? status[q.questionId] : []
        return (
          <FillBlankQuestion
            isDoingMode={isDoingMode}
            content={q}
            key={q.questionId}
            correctKey={correctKey}
            onCollectingData={collectingData}
          />
        )
      },
    ))
  }, [isDoingMode]);

  useEffect(() => {
    if (signalToSubmit) {
      handleCollectingData(quizzes)
    }
  }, [signalToSubmit])

  const imageSource = (image) => {
    if (image) {
      return `${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/')[image.split('/').length - 1]}`
    }
    return '';
  }
  const questionImg = (detail.mainImg && (
    <div className="fill-blank__image--big">
      <img className={classNames({ hidden: !detail.mainImg })} src={imageSource(detail.mainImg)} alt="kid" />
    </div>
  ))

  const questionText = (detail.mainText && <span>{detail.mainText}</span>)
  return (
    <ExcerciseCard title={title} key={exId} id={exId} className="tw-relative" exerciseType={ExerciseType.FillBlank.type} exerciseAudio={exerciseAudio}>
      <div className="fill-blank">
        {questionImg}
        {questionText}
        <div className="fill-blank__exercise-content">
          {questionContent}
        </div>
      </div>
    </ExcerciseCard>
  )
}

export default FillBlank
