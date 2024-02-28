import React, { useEffect, useState } from 'react'
import ExerciseType from '../../../../services/exerciseType'
import ExcerciseCard from '../exerciseCard'
import SentenceTemplate from './components/senteceTemplate'

function MakeSentence({
  exId,
  detail,
  title,
  isDoingMode,
  handleCollectingData,
  status,
  signalToSubmit,
  exerciseAudio,
}) {
  const [sentences, setSentences] = useState(detail.sentences)
  // console.log(sentences)

  useEffect(() => {
    if (signalToSubmit) {
      handleCollectingData({ sentences })
    }
  }, [signalToSubmit])
  useEffect(() => {
    if (!isDoingMode && status) {
      const newSentences = structuredClone(sentences)
      for (const sentence of newSentences) {
        sentence.isCorrect = status.find(
          (item) => item.sentenceKey === sentence.sentenceKey,
        ).correct
        for (const question of sentence.questions) {
          const correct = status
            .find((item) => item.sentenceKey === sentence.sentenceKey)
            .correctAnswer.find(
              (item) => item.questionKey === question.questionKey,
            ).answerKey
          const userChoice = status
            .find((item) => item.sentenceKey === sentence.sentenceKey)
            .userAnswer.find(
              (item) => item.questionKey === question.questionKey,
            ).answerKey
          question.options.map((item) => {
            item.isCorrect = item.key === correct
            if (userChoice !== undefined) item.chosen = item.key === userChoice
            return item
          })
        }
      }
      setSentences(newSentences)
    }
  }, [isDoingMode, status])
  // this directly modify the state, which is not allowed in react but it helps server have chosen info...
  function choseOption(sentenceKey, questionKey, optionKey) {
    const newSentences = [...sentences]
    const sentence = newSentences.find((s) => s.sentenceKey === sentenceKey)
    const question = sentence.questions.find((q) => q.questionKey === questionKey)
    question.options = question.options.map((option) => {
      const newOption = { ...option }
      if (newOption.key === optionKey) {
        newOption.chosen = true
      } else {
        newOption.chosen = false
      }
      return newOption
    })
    setSentences(newSentences)
  }
  return (
    <ExcerciseCard
      title={title}
      id={exId}
      className="tw-relative"
      exerciseType={ExerciseType.MakeSentence.type}
      exerciseAudio={exerciseAudio}

    >
      {sentences.map((sentence, index) => (
        <SentenceTemplate
          sentenceKey={sentence.sentenceKey}
          sentence={sentence}
          key={sentence.sentenceKey}
          // eslint-disable-next-line react/jsx-no-bind
          choseOption={choseOption}
          isDoingMode={isDoingMode}
          no={index}
        />
      ))}
    </ExcerciseCard>
  )
}

export default MakeSentence
