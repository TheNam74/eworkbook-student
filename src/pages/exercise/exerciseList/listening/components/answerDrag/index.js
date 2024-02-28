/* eslint-disable */
import React from 'react'
import { useDrag } from "react-dnd"
import { Image } from 'antd';


function AnswerDrag({
  answerImg, answerText, answerId, onClick, isDrag, className, dragableKey,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: isDrag ? `givenWord-${dragableKey}` : "droppedWord",
    item: {answerImg, answerText, answerId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  const hidden = isDragging ? "tw-hidden" : "";
  const imageSource = (image) => (image ? (`${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/').at(-1)}`) : '');
  answerImg = imageSource(answerImg)
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div ref={drag} onClick={onClick} content={answerText} className={` tw-overflow-hidden tw-pt-0.5 tw-bg-third tw-text-primary tw-border-2 tw-border-black tw-rounded-md tw-cursor-pointer tw-text-center ${hidden} ${className}`}>
      <div>{answerText}</div>
      <img className='tw-w-3/5' src={answerImg}></img>
    </div>
  )
}

export default AnswerDrag
