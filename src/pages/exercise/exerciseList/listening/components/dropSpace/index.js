/* eslint-disable */
import React, { useRef } from "react";
import { CheckCircleOutlined, CloseCircleOutlined,SoundOutlined } from '@ant-design/icons'
import { useDrop } from 'react-dnd'
import AnswerDrag from "../answerDrag";
import { audioButton } from "../audioButton/audioButton";

function DropSpace({
  content, onClickHandler, onDrop, onCollectingData, userAnswer, isDoingMode, dragableKey,
}) {
  const droppedWord = useRef();
  const clickHandler = (answerId,answerImg, answerText) => {
    onClickHandler(answerId,answerImg, answerText)
    droppedWord.current = null
  }
  const dropHandler = (item, isOver) => {
    onCollectingData(item, content.questionId)
    onDrop(item.answerId)
    // eslint-disable-next-line max-len
    if (droppedWord.current) {
      onClickHandler(droppedWord.current.props.answerId,droppedWord.current.props.answerImg, droppedWord.current.props.answerText)
    }
    // eslint-disable-next-line max-len
    droppedWord.current = <AnswerDrag className="tw-w-full tw-h-full" onClick={() => clickHandler(item.answerId,item.answerImg, item.answerText)} id={item.answerId} answerImg={item.answerImg} answerText={item.answerText} isDrag={false} />
  }
  const [{ isOver }, drop] = useDrop(() => ({
    accept: `givenWord-${dragableKey}`,
    drop: (item) => dropHandler(item, isOver),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const audioSource = (audio) => `${process.env.REACT_APP_API_URL}/exercises/audios/${audio}`;
  const audio = audioSource(content.questionAudio)

  return(
    <div className="tw-relative tw-w-32 tw-h-32" >
      {/* <button className="tw-absolute tw tw-top-1 tw-left-1" onClick={()=>{
          let audio1 = new Audio(audio)
          audio1.play()
        }}>
          <SoundOutlined />
      </button> */}
      <SoundOutlined style={{ fontSize: '32px'}} className="tw- tw-absolute tw tw-top-1 tw-left-1" onClick={()=>{
          let audio1 = new Audio(audio)
          audio1.play()
        }}/>
      <div ref={drop} className={`tw-flex tw-justify-center tw-items-center tw-w-32 tw-h-32 tw-border-solid tw-border-2 tw-border-secondary tw-rounded-md ${!isDoingMode?"tw-border-4":''} ${!isDoingMode&&userAnswer.correct?"tw-border-right":''} ${!isDoingMode&&!userAnswer.correct?"tw-border-wrong":''} `}>
        {droppedWord.current}
        {
          !isDoingMode && userAnswer
          && (userAnswer.correct
            ? (
              <AnswerDrag className="tw-w-full tw-h-full" id={userAnswer.correctAnswer.answerId} answerImg={userAnswer.correctAnswer.answerImg} answerText={userAnswer.correctAnswer.answerText} isDrag={false} />
            )
            : (
              <AnswerDrag className="tw-w-full tw-h-full" id={userAnswer.correctAnswer.answerId} answerImg={userAnswer.correctAnswer.answerImg} answerText={userAnswer.correctAnswer.answerText} isDrag={false} />
            ))
        }
      </div>
    </div>
  )
}

export default DropSpace
