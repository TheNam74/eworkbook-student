import React, { useState, useEffect, useRef } from "react";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";
import ExcerciseCard from "../exerciseCard";
import ExerciseType from '../../../../services/exerciseType'
import './crossword.scss';

const convertData = (data) => {
  const newData = {
    across: {},
    down: {},
  }
  data.forEach((element, index) => {
    if (element.orientation === 'across') {
      newData.across[index + 1] = {
        clue: element.clue,
        answer: element.answer.toUpperCase(),
        row: element.position[1] - 1,
        col: element.position[0] - 1,
      }
    } else {
      newData.down[index + 1] = {
        clue: element.clue,
        answer: element.answer.toUpperCase(),
        row: element.position[1] - 1,
        col: element.position[0] - 1,
      }
    }
  });
  return newData;
}
const CrosswordAnswer = {}
function CrosswordPuzzle({
  // eslint-disable-next-line no-unused-vars
  exId, detail, title, isDoingMode, handleCollectingData, status, signalToSubmit, exerciseAudio,
}) {
  const crosswordRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [question, setQuestion] = useState({
    data: convertData(detail),
  });
  useEffect(() => {
    if (signalToSubmit) {
      handleCollectingData({ detail: question.data, answer: CrosswordAnswer[exId] })
    }
  }, [signalToSubmit])

  const handleGetAnswer = (row, col, val) => {
    const answer = CrosswordAnswer[exId] || {};
    if (!answer[row]) {
      answer[row] = {}
    }
    answer[row][col] = val;
    CrosswordAnswer[exId] = answer;
  }
  useEffect(() => {
    if (!isDoingMode) {
      crosswordRef.current.fillAllAnswers();
    } else {
      localStorage.removeItem('guesses');
    }
  }, [isDoingMode])
  return (
    <ExcerciseCard
      id={exId}
      title={title}
      exerciseType={ExerciseType.Crossword.type}
      exerciseAudio={exerciseAudio}
    >
      <div className="crossword-puzzle">
        <ThemeProvider
          theme={{
            gridBackground: "transparent",
            columnBreakpoint: '768px',
          }}
        >
          <Crossword
            ref={crosswordRef}
            data={question.data}
            onCellChange={handleGetAnswer}
          />
        </ThemeProvider>
      </div>
    </ExcerciseCard>
  );
}

export default CrosswordPuzzle;
