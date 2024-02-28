/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-extend-native */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { Row, Col } from "antd"
import { DndProvider } from "react-dnd"
// import { HTML5Backend } from 'react-dnd-html5-backend'
import ExcerciseCard from '../exerciseCard'
import ExerciseType from '../../../../services/exerciseType'
import GivenWord from './components/givenWord'
import DropSpace from './components/dropSpace'
import CustomDragLayer from '../../components/customDragLayer'

function DragAndDrop({
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const [quizzes, setQuizzes] = useState(detail);
  const collectingData = (item, contextId) => {
    const newContextArray = quizzes.contextArray.map((q) => {
      if (q.contextId === contextId) {
        q.answer = item;
      }
      return q
    })
    const newQuizzes = { ...quizzes, contextArray: newContextArray }
    setQuizzes(newQuizzes)
  }

  const [givenWordArray, setGivenWordArray] = useState(quizzes.givenWords)
  const givenWordClickHandler = (givenWordId, word) => {
    setGivenWordArray((prev) => [...prev, { id: givenWordId, word }])
  }
  useEffect(() => {
    if (signalToSubmit) {
      handleCollectingData(quizzes)
      setGivenWordArray(null)
    }
    detail.givenWords = detail.givenWords.sort(() => 0.5 - Math.random());
  }, [signalToSubmit])

  const dropHandler = (givenWordId) => {
    setGivenWordArray((prev) => prev.filter((item) => item.id !== givenWordId))
    // console.log(givenWordId)
  }

  return (
    <ExcerciseCard title={title} key={exId} id={exId} className="tw-relative" exerciseType={ExerciseType.DragAndDrop.type} exerciseAudio={exerciseAudio}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <CustomDragLayer component="dnd" />
        <Row className="md:tw-w-full sm:tw-w-full lg:tw-w-4/5 xl:tw-w-4/5">
          <Col span={24}>
            <Row className="tw-flex tw-flex-wrap tw-justify-center tw-min-h-[50px]">
              {isDoingMode
                && givenWordArray
                && givenWordArray.map(
                  (item) => (
                    <GivenWord
                      word={item.word}
                      id={item.id}
                      key={item.id}
                      isDrag={true}
                      dragableKey={exId}
                    />
                  ),
                )}
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {quizzes.contextArray.map((item, index) => (
                <Col span={6}>
                  <DropSpace
                    onDrop={dropHandler}
                    onClickHandler={givenWordClickHandler}
                    content={item}
                    onCollectingData={collectingData}
                    userAnswer={status ? status[index] : ""}
                    isDoingMode={isDoingMode}
                    dragableKey={exId}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </DndProvider>
    </ExcerciseCard>
  )
}

export default DragAndDrop
