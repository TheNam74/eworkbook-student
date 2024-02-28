import React, { useRef } from "react";
import { Input } from 'antd';
import classNames from 'classnames'
import './fillBlankQuestion.scss'

function FillBlankQuestion({
  content, isDoingMode, onCollectingData, correctKey,
}) {
  const inputRef = useRef()
  const isCorrect = correctKey?.correct
  const input = (
    <Input
      ref={inputRef}
      placeholder="type answer here"
      onChange={(e) => {
        onCollectingData(e.target.value, content.questionId)
      }}
      value={correctKey.answer}
    />
  )

  const questionText = content.questionText ? content.questionText : ''
  const imageSource = (image) => {
    if (image) {
      return `${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/')[image.split('/').length - 1]}`
    }
    return "../assets/images/no-image.jpg";
  }
  return (
    <div className={
      classNames('fill-blank-questions', {
        'correct-answer': !isDoingMode && isCorrect,
        'wrong-answer': !isDoingMode && !isCorrect,
      })
    }
    >
      <div className="fill-blank-questions__question">
        <div className="fill-blank-questions__question__text text">
          {`${content.questionId + 1}. ${questionText}`}
        </div>
        <div className={classNames("fill-blank-questions__question__image", { hidden: !content.questionImg })}>
          <img src={imageSource(content.questionImg)} alt="kid" />
        </div>
      </div>
      <div className="fill-blank-questions__answer">
        <div className="fill-blank-questions__answer__text text">
          Answer
        </div>
        {input}
        {!isDoingMode && !isCorrect
          && (
          <span className="xs:tw-text-xs">
            correct answer is
            <span className="tw-text-primary tw-font-semibold">
              &nbsp;
              {correctKey?.correctAnswer}
            </span>
          </span>
          )}
      </div>
    </div>
  )
}

export default FillBlankQuestion
