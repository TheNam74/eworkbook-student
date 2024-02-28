import React, { useEffect, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import ExcerciseCard from '../exerciseCard'
import ExerciseType from '../../../../services/exerciseType'
import MainContent from './components/mainContent'
import SortContainer from './components/sortContainer'
import CustomDragLayer from '../../components/customDragLayer'

function Sort({
  exId,
  detail,
  title,
  isDoingMode,
  handleCollectingData,
  status,
  signalToSubmit,
  exerciseAudio,
}) {
  const questions = useRef(detail.questions)
  useEffect(() => {
    if (signalToSubmit) {
      handleCollectingData(
        questions.current.map((q) => ({
          questionIndex: q.questionIndex,
          userAnswer: q.questionElements.map((e) => e.elementId),
        })),
      )
    }
  }, [signalToSubmit])
  useEffect(() => {
    if (!isDoingMode && status) {
      const newQuestions = questions.current.map((q, index) => ({
        ...q,
        ...status[index],
      }))
      questions.current = newQuestions
    }
  }, [isDoingMode, status])
  const updateQuestion = (questionIndex, questionElements) => {
    const updateIndex = questions.current.findIndex(
      (question) => question.questionIndex === questionIndex,
    )
    questions.current[updateIndex].questionElements = questionElements
  }
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <ExcerciseCard
        exerciseAudio={exerciseAudio}
        title={title}
        id={exId}
        className="tw-relative"
        exerciseType={ExerciseType.Sort.type}
      >
        <MainContent
          classNames="tw-container tw-items-center image-wrap sort__main-content"
          html={detail.mainContent}
        />
        <CustomDragLayer component="sort" />
        {questions.current.map((q, no) => (
          <SortContainer
            no={no}
            key={q.questionIndex}
            index={q.questionIndex}
            items={q.questionElements}
            signalToSubmit={signalToSubmit}
            updateQuestion={updateQuestion}
            status={q.correct}
            correctAnswer={q.correctAnswer}
            userAnswer={q.userAnswer}
            isDoingMode={isDoingMode}
          />
        ))}
      </ExcerciseCard>
    </DndProvider>
  )
}

export default Sort
