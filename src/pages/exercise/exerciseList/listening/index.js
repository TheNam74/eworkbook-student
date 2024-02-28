/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { Row, Col } from "antd"
import { DndProvider } from "react-dnd"
import ExcerciseCard from '../exerciseCard'
import ExerciseType from '../../../../services/exerciseType'
import AnswerDrag from './components/answerDrag'
import DropSpace from './components/dropSpace'

const materialInformationResponsive = {
  xs: 8,
  sm: 8,
  md: 8,
  xl: 8,
  xxl: 8,
}
function Listening({
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const [quizzes, setQuizzes] = useState(detail);
  const collectingData = (item, questionId) => {
    //Thêm cái answer vừa được thả vào object question tương ứng drop space
    // // console.log(`answer: ${item.answerId}, questionId: ${questionId}`)
    const newQuestionArray = quizzes.questionArray.map((q) => {
      if (q.questionId === questionId) {
        q.answer = item;
      }
      return q
    })
    const newQuizzes = { ...quizzes, questionArray: newQuestionArray }
    // // console.log("quizzessss, ",quizzes.questionArray)
    setQuizzes(newQuizzes)
  }
  //shuffle answer array then assign
  const [answerArray, setAnswerArray] = useState(quizzes.answerArray.sort((a, b) => 0.5 - Math.random()))
  const answerClickHandler = (answerId, answerImg, answerText) => {
    //Xóa đi câu trả lời vừa được click ở dropspace(nghĩa là ở trong question array tương ứng dropspace đó)
    const newQuestionArray = quizzes.questionArray.map((q) => {
      if (q?.answer?.answerId === answerId) {
        delete q.answer
      }
      return q
    })
    const newQuizzes = { ...quizzes, questionArray: newQuestionArray }
    setQuizzes(newQuizzes)

    //Thêm câu trả lời vừa được click về lại vùng drag
    setAnswerArray((prev) => [...prev, { answerId: answerId, answerImg: answerImg, answerText }])
  }
  useEffect(() => {
    if (signalToSubmit) {
      // console.log("aloooooo")
      // handleCollectingData(quizzes)
      setAnswerArray(null)
    }
  }, [signalToSubmit])

  const dropHandler = (answerId) => {
    // // console.log("cái này drop xuống nek, ",answerId)
    setAnswerArray((prev) => prev.filter((item) => item.answerId !== answerId))
  }
  return (
    <ExcerciseCard title={title} key={exId} id={exId} className="tw-relative" exerciseType={ExerciseType.Listening.type} exerciseAudio={exerciseAudio}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        {isDoingMode ?
          <Row justify="space-evenly" className="tw-w-full">
            {answerArray && answerArray.map((item) => (
              <Col >
                <AnswerDrag className="tw-w-24 tw-h-24 tw-m-2" answerImg={item.answerImg} answerText={item.answerText} answerId={item.answerId} key={item.answerId} isDrag={true} dragableKey={exId} />
              </Col>))}
          </Row> : ""
        }
        <Row gutter={[8, 8]} justify="space-evenly" className="tw-w-full">
          {quizzes.questionArray.map((item, index) => (
            <Col >
              <DropSpace
                onDrop={dropHandler}
                onClickHandler={answerClickHandler}
                content={item}
                onCollectingData={collectingData}
                userAnswer={status ? status[index] : ""}
                isDoingMode={isDoingMode}
                dragableKey={exId}
              />
            </Col>
          ))}
        </Row>

      </DndProvider>
    </ExcerciseCard>
  )
}

export default Listening
