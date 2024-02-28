/* eslint-disable */
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import './Multichoice.scss'
import ExcerciseCard from '../exerciseCard'
import ExerciseType from '../../../../services/exerciseType'

function AnswerItem({ answerId, answerImg, answerText, isKey, isDoingMode, handleSelected, isSelected }) {
  return (
    <div className={
      isDoingMode ?
        `answer-item${isSelected ? '--selected' : ''}` :
        `answer-item${!isKey && isSelected ? '--wrong' : (
          isKey ? '--correct' : ''
        )}`
    } onClick={() => handleSelected(answerId)}>
      {answerImg && <div className="answer-item__image">
        <img src={answerImg} alt="answer" />
      </div>}
      <div className="answer-item__text">
        <p>{answerText}</p>
      </div>
    </div>
  )
}

function MultiChoice({
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio, correctAnswer,
}) {
  const [quizzes, setQuizzes] = useState(detail)
  const handleSelected = (answerId) => {
    // eslint-disable-next-line
    const [_, qId, aId] = answerId.split('#')
    const newQuizzesList = quizzes.map((quiz, index) => {
      if (index === +qId) {
        if (quiz.selected) {
          const selectedBefore = quiz.selected.findIndex((item) => item === +aId) !== -1
          if (selectedBefore) quiz.selected = quiz.selected.filter((item) => item !== +aId)
          else quiz.selected.push(+aId)
        } else {
          quiz.selected = [+aId]
        }
        if (correctAnswer[index]?.length < quiz.selected.length) {
          quiz.selected = quiz.selected.slice(1)
        }
      }
      return quiz
    })
    setQuizzes(newQuizzesList)
  }

  // Key generator for answer and question
  const idQuestion = (qId) => `${exId}#${qId}`
  const idAnswer = (qId, aId) => `${exId}#${qId}#${aId}`
  const imageSource = (image) => (image ? (`${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/')[image.split('/').length - 1]}`) : '');

  useEffect(() => {
    if (!isDoingMode && status) {
      const newQuizzesList = quizzes.map((quiz, index) => ({
        ...quiz,
        ...status[index],
      }))
      setQuizzes(newQuizzesList)
    }
  }, [isDoingMode, status])
  useEffect(() => {
    if (signalToSubmit) {
      handleCollectingData(quizzes)
    }
  }, [signalToSubmit])

  return (
    <ExcerciseCard
      title={title}
      id={exId}
      exerciseType={ExerciseType.MultipleChoice.type}
      exerciseAudio={exerciseAudio}
    >
      <div className="multichoice">
        {
          quizzes && quizzes?.map(({
            questionText, questionImg, answers, correct, selected,
          }, qId) => (
            <div
              key={idQuestion(qId)}
              className={
                classNames('multichoice__item', {
                  "multichoice__item--wrong": !isDoingMode && !correct,
                  "multichoice__item--true": !isDoingMode && correct,
                })
              }
            >
              <div className="multichoice__question">
                <p className="multichoice__question__text">
                  {questionText || 'Choose the best answer'}
                </p>
                {questionImg && <img src={imageSource(questionImg)} alt="question" />}
              </div>
              {correctAnswer && <div className="multichoice__hint tw-relative">
                Choose {correctAnswer[qId].length === 1 ? 'one answer' : `${correctAnswer[qId].length} answers`}.
              </div>}
              <div className="multichoice__answer-list">
                {
                  answers && answers?.map(({
                    answerText, answerImg,
                  }, aId) => (
                    <AnswerItem
                      key={idAnswer(qId, aId)}
                      answerId={idAnswer(qId, aId)}
                      answerImg={answerImg ? imageSource(answerImg) : ''}
                      answerText={answerText}
                      isKey={!isDoingMode && status ? status[+qId]?.correctAnswer?.includes(aId) : false}
                      isDoingMode={isDoingMode}
                      handleSelected={handleSelected}
                      isSelected={!isDoingMode && status ? status[+qId]?.selected?.includes(aId) : selected?.includes(aId)}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </ExcerciseCard>
  )
}

export default MultiChoice
