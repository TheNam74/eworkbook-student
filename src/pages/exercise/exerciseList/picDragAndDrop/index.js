/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { Row, Col } from "antd"
import { DndProvider } from "react-dnd"
import ExcerciseCard from '../exerciseCard'
import GivenWord from './givenWord'
import DropZone from './dropZone'
import ExerciseType from '../../../../services/exerciseType';
import Audio from './audio'
import CustomDragLayer from '../../components/customDragLayer'

function PicDragAndDrop({
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const [quizzes, setQuizzes] = useState(detail);
  const collectingData = (item, coordinateId) => {
    const newCoordinates = quizzes.coordinates.map((q) => {
      if (q.id === coordinateId) {
        q.answer = item;
      }
      return q
    })
    const newQuizzes = { ...quizzes, coordinates: newCoordinates }
    setQuizzes(newQuizzes)
  }

  // // console.log("isDoingMode", collectingData)
  // console.log("isDoingMode", isDoingMode)
  // console.log("status", status)

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

  const imageSource = (image) => (image ? (`${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/')[image.split('/').length - 1]}`) : '');

  return (
    <ExcerciseCard title={title} key={exId} id={exId} className="tw-relative" exerciseType={ExerciseType.PicDragAndDrop.type} exerciseAudio={exerciseAudio}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <CustomDragLayer component="dnd" />
        <Row>
          <Col span={24}>
            <div className="tw-flex tw-flex-wrap tw-justify-center">
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
                      isDoingMode={isDoingMode}
                    />
                  ),
                )}
            </div>
          </Col>
        </Row>
        <div className="tw-mt-5 tw-relative">
          <img className="tw-w-full tw-rounded-md tw-drop-shadow-xl" src={imageSource(detail.mainImg)} alt="mainImg" />
          {quizzes.coordinates.map((item, index) => (
            <DropZone
              onDrop={dropHandler}
              onClickHandler={givenWordClickHandler}
              coordinate={item}
              onCollectingData={collectingData}
              userAnswer={status ? status[index] : ""}
              isDoingMode={isDoingMode}
              dragableKey={exId}
            />
          ))}
        </div>
      </DndProvider>
      {detail.audio && <Audio source={detail.audio} />}
    </ExcerciseCard>
  )
}

export default PicDragAndDrop

// {/* <div className="tw-absolute tw-top-10 tw-left-10 tw-p-2 tw-border-solid tw-border-primary tw-rounded-md">
//           ...
//         </div> */}
