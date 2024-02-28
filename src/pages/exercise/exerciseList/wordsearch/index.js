/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import ExcerciseCard from '../exerciseCard'
import Grid from './components/Grid'
import WordList from './components/WordList'
import ExerciseType from '../../../../services/exerciseType'

// have to hardcode classname
// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
const STROKE_COLOR = ['tw-stroke-[#f87171]', 'tw-stroke-[#a3e635]', 'tw-stroke-[#22d3ee]', 'tw-stroke-[#818cf8]', 'tw-stroke-[#e879f9]', 'tw-stroke-[#34d399]', 'tw-stroke-[#c084fc]', 'tw-stroke-[#db2777]', 'tw-stroke-[#ca8a04]', 'tw-stroke-[#78716c]']

const DECORATION_COLOR = ['tw-decoration-[#f87171]', 'tw-decoration-[#a3e635]', 'tw-decoration-[#22d3ee]', 'tw-decoration-[#818cf8]', 'tw-decoration-[#e879f9]', 'tw-decoration-[#34d399]', 'tw-decoration-[#c084fc]', 'tw-decoration-[#db2777]', 'tw-decoration-[#ca8a04]', 'tw-decoration-[#78716c]']

const indices = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const shuffledStrokeColor = indices.map((idx) => STROKE_COLOR[idx]);
const shuffledDecorColor = indices.map((idx) => DECORATION_COLOR[idx]);

function fieldToColor(obj, field, isLine) {
  const keys = Object.keys(obj);
  const index = _.findIndex(keys, (key) => key === field);
  const colorIndex = index % STROKE_COLOR.length;
  return isLine ? shuffledStrokeColor[colorIndex] : shuffledDecorColor[colorIndex];
}

function convertArrayToKeyObject(words) {
  const keyObject = {}
  words.forEach((pattern) => {
    keyObject[pattern.word] = pattern
  })
  return keyObject
}
function objectMap(object, mapFn) {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(object[key])
    return result
  }, {})
}

let attemptedWordsBK = []
export default function Wordsearch({
  // eslint-disable-next-line no-unused-vars
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const [words, setWords] = useState(convertArrayToKeyObject(detail.words))
  // console.log(words)
  // useEffect(() => // console.log('Wordsearch useEffect'), [])

  useEffect(() => {
    if (!isDoingMode) {
      const patternWithAttempted = objectMap(words, (pattern) => ({
        ...pattern,
        solved: _.find(status, (s) => s.word === pattern.word)?.correct,
      }))
      setWords(patternWithAttempted)
    }
  }, [isDoingMode])
  useEffect(() => {
    if (signalToSubmit) {
      handleCollectingData({ attemptedWord: attemptedWordsBK, grid: detail.grid })
    }
  }, [signalToSubmit])

  function attemptSolution(start, end) {
    const word = Object.values(words).find(
      (pattern) => (_.isEqual(pattern.start, start) && _.isEqual(pattern.end, end))
        || (_.isEqual(pattern.start, end) && _.isEqual(pattern.end, start)),
    )
    if (word) {
      setWords((prev) => ({
        ...prev,
        [word.word]: { ...word, solved: true },
      }))
      attemptedWordsBK = [...attemptedWordsBK, word.word]
    }
  }

  function setWordHinted(word, hinted) {
    if (words[word]) {
      setWords((prev) => ({
        ...(objectMap(prev, (p) => _.omit(p, 'hinted'))),
        [word]: { ...words[word], hinted },
      }))
    }
  }
  return (
    <ExcerciseCard
      title={title}
      key={exId}
      id={exId}
      className="tw-relative"
      exerciseType={ExerciseType.Wordsearch.type}
      exerciseAudio={exerciseAudio}
    >
      <div className="tw-flex tw-flex-wrap tw-justify-around tw-w-full tw-justify-items-center tw-mt-5 tw-justify-center">
        <WordList
          words={words}
          setWordHinted={setWordHinted}
          showWordHints={!isDoingMode}
          className="tw-w-[12rem]"
          decorColorGen={(obj, field) => fieldToColor(obj, field, false)}
          isDoingMode={isDoingMode}
        />
        <Grid
          words={words}
          attemptSolution={attemptSolution}
          grid={detail.grid}
          strokeColorGen={(obj, field) => fieldToColor(obj, field, true)}
          isDoingMode={isDoingMode}
        />
      </div>
    </ExcerciseCard>
  )
}
