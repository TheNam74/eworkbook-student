import React, { useRef, useState } from "react";
import { Input } from 'antd';
import classNames from 'classnames'
import './unscrambleQuestion.scss'
import Translation from "../../../../../services/multi-language";

function UnscrambleQuestion({
  content, isDoingMode, onCollectingData, correctKey,
}) {
  // eslint-disable-next-line
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // eslint-disable-next-line
  // const moveElementAnimation = async (element, target) => { 
  //   element.style.position = 'absolute';
  //   element.style.zIndex = 1000;
  //   const coords = element.getBoundingClientRect();
  //   const shiftX = event.clientX - coords.left - pageXOffset;
  //   const shiftY = event.clientY - coords.top - pageYOffset;
  //   element.style.left = `${event.pageX - shiftX}px`;
  //   element.style.top = `${event.pageY - shiftY}px`;
  //   await sleep(10);
  //   element.style.transition = '0.5s';
  //   element.style.left = `${target.getBoundingClientRect().left}px`;
  //   element.style.top = `${target.getBoundingClientRect().top}px`;
  //   await sleep(500);
  //   element.style.position = 'static';
  //   element.style.zIndex = 0;
  //   element.style.left = '0px';
  //   element.style.top = '0px';
  //   element.style.transition = '0s';
  // }
  const inputRef = useRef()
  const isCorrect = correctKey?.correct
  const input = (
    <Input
      ref={inputRef}
      placeholder="type answer here"
      onChange={(e) => {
        onCollectingData(e.target.value, content.questionId)
      }}
      value={correctKey?.answer}
      hidden="true"
    />
  )
  const { t } = Translation();

  const questionText = content.questionText ? content.questionText : ''
  // console.log('questionText', questionText)
  const questionTextReplaced = questionText.replaceAll("]", "");
  // console.log('questionTextReplaced', questionTextReplaced)
  const questionTextReplacedArray = questionTextReplaced.split("[");
  // console.log("questionTextReplacedArray", questionTextReplacedArray);
  questionTextReplacedArray.shift();
  // console.log("questionTextReplacedArray", questionTextReplacedArray);
  const [answer, setAnswer] = useState([])
  const [scrambled, setScrambled] = useState([])
  const [clickedList, setClickedList] = useState([])
  const [answerIndexOfScrambled, setAnswerIndexOfScrambled] = useState([])
  const imageSource = (image) => {
    if (image) {
      return `${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/')[image.split('/').length - 1]}`
    }
    return '';
  }
  if (questionText !== '' && scrambled.length === 0 && answer.length === 0) {
    setScrambled(questionTextReplacedArray.filter((q) => q !== ''));
    // set clicked list to false all
    setClickedList(questionTextReplacedArray.filter((q) => q !== '').map(() => false))

    if (isDoingMode === false && correctKey?.correctAnswer && isCorrect) {
      // console.log('conntet', content)
      // console.log('correctKey', correctKey)
      if (content.isCharacterScramble) {
        setAnswer(correctKey.correctAnswer.split(''));
      } else if (content.isCharacterScramble === false) {
        setAnswer(correctKey.correctAnswer.split(' '));
      }
    } else if (isDoingMode === false && correctKey?.answer && !isCorrect) {
      // console.log('conntet', content)
      // console.log('correctKey', correctKey)
      if (content.isCharacterScramble) {
        setAnswer(correctKey.answer.split(''));
      } else if (content.isCharacterScramble === false) {
        setAnswer(correctKey.answer.split(' '));
      }
    }
  }
  return (
    <div className={
      classNames('unscramble-questions', {
        'correct-answer': !isDoingMode && isCorrect,
        'wrong-answer tw-text-center': !isDoingMode && !isCorrect,
      })
    }
    >
      <div className="unscramble-questions__question tw-hidden">
        <div className="unscramble-questions__question__text text">
          {`${content.questionId + 1}. ${questionText}`}
        </div>
        <div className={classNames("unscramble-questions__question__image", { hidden: !content.questionImg })}>
          <img src={imageSource(content.questionImg)} alt="kid" />
        </div>
      </div>
      <div className="unscramble-questions__question__text text">
        {`${content.questionId + 1}. `}
      </div>
      <div className="unscramble-questions__answer">

        <div className="unscramble-questions-scrambled tw-text-center">
          {scrambled.map((item, index) => (
            <button
              type="button"
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              className={`unscramble-questions-scrambled__item${(clickedList[index] ? '__clicked' : '')}`}
              onClick={async () => {
                if (clickedList[index]) return;
                await sleep(100)
                if (!isDoingMode) return;
                setAnswer([...answer, item])
                // setScrambled(scrambled.filter((_, i) => i !== index))
                setClickedList(clickedList.map((_, i) => (i === index ? true : _)))
                setAnswerIndexOfScrambled([...answerIndexOfScrambled, index])
                let newAnswerString = '';
                if (content.isCharacterScramble) {
                  newAnswerString = answer.join('') + item;
                } else {
                  newAnswerString = `${answer.join(' ')} ${item}`;
                }
                // console.log('newAnswerString', newAnswerString)
                onCollectingData(newAnswerString, content.questionId)
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="unscramble-questions__answer__text text">
          Answer
        </div>
        <div className="unscramble-questions-answer-container">
          <div className="unscramble-questions-answer tw-min-h-[200%] tw-text-left tw-pl-[15%]">
            {answer.map((item, index) => (
              <button
                type="button"
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                className="unscramble-questions-answer__item tw-bg-blue-400"
                onClick={async () => {
                  await sleep(100)
                  if (!isDoingMode) return;
                  // setScrambled([...scrambled, item])
                  const indexOfItem = answerIndexOfScrambled[index]
                  setAnswerIndexOfScrambled(answerIndexOfScrambled.filter((_, i) => i !== index))
                  setClickedList(clickedList.map((_, i) => (i === indexOfItem ? false : _)))
                  setAnswer(answer.filter((_, i) => i !== index))
                  let newAnswerString = '';
                  if (content.isCharacterScramble) {
                    newAnswerString = `${answer.join('')}${item}`;
                  } else {
                    newAnswerString = `${answer.join(' ')} ${item}`;
                  }
                  onCollectingData(newAnswerString, content.questionId)
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="unscramble-questions-answer-decorator" />
        </div>
        {input}
        {!isDoingMode && !isCorrect
          && (
            <span className="xs:tw-text-xs tw-text-center tw-w-full tw-self-center">
              {t('exercise.correctAnswer')}
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

export default UnscrambleQuestion
