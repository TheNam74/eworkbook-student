/* eslint-disable max-len */
import React, { useRef } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useDrop } from 'react-dnd'
import GivenWord from "../givenWord";

function DropZone({
  coordinate, onClickHandler, onDrop, onCollectingData, userAnswer, isDoingMode, dragableKey,
}) {
  const droppedWord = useRef();
  const clickHandler = (id, word) => {
    onClickHandler(id, word)
    droppedWord.current = null
  }
  const dropHandler = (item) => {
    // console.log("iOver", isOver)
    onCollectingData(item, coordinate.id)
    onDrop(item.id)
    // eslint-disable-next-line max-len
    if (droppedWord.current) {
      onClickHandler(droppedWord.current.props.id, droppedWord.current.props.word)
    }
    // eslint-disable-next-line max-len
    droppedWord.current = <GivenWord className="!tw-m-0" onClick={() => clickHandler(item.id, item.word)} id={item.id} word={item.word} isDrag={false} />
  }
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: `givenWord-${dragableKey}`,
    drop: (item) => dropHandler(item, isOver),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = isOver && canDrop;
  let style = "tw-border-dashed tw-border-2 tw-border-primary tw-rounded-md tw-min-w-[70px] tw-min-h-[30px]";
  if (isActive) {
    style = "tw-border-solid tw-bg-third tw-border-3 tw-border-primary tw-rounded-md tw-min-w-[70px] tw-min-h-[30px]"
  } else {
    style = "tw-border-dashed tw-border-2 tw-border-primary tw-rounded-md tw-min-w-[70px] tw-min-h-[30px]"
  }

  return (
    <div
      ref={drop}
      className={style}
      style={{
        zIndex: '100',
        position: 'absolute',
        top: `${coordinate.top}%`,
        left: `${coordinate.left}%`,
      }}
    >
      {droppedWord.current}
      {
        !isDoingMode && userAnswer
        && (userAnswer.correct
          ? (
            <span className="tw-flex tw-items-center tw-justify-between">
              <CheckCircleOutlined style={{ color: 'green', marginLeft: '5px' }} />
              <GivenWord className="tw-border-solid !tw-border-right !tw-mb-1 tw-w-4/5" id={userAnswer.answer.id} word={userAnswer.answer.word ? userAnswer.answer.word : ""} isDrag={false} />
            </span>
          )
          : (
            <span className="tw-flex tw-items-center tw-justify-between">
              <CloseCircleOutlined style={{ color: '#b50000', marginLeft: '5px' }} />
              <GivenWord className="tw-border-solid !tw-border-wrong tw-w-4/5 !tw-mb-1" id={userAnswer.answer.id} word={userAnswer.answer.word ? userAnswer.answer.word : ""} isDrag={false} />
            </span>
          ))
      }
      {
        !isDoingMode
        && !userAnswer.correct
        && (
          <span className="tw-flex tw-items-center tw-justify-between">
            <CheckCircleOutlined style={{ color: 'green', marginLeft: '5px' }} />
            <GivenWord className="tw-border-solid !tw-border-right tw-w-4/5" word={userAnswer.correctAnswer} isDrag={false} />
          </span>
        )
      }
    </div>
  )
}

export default DropZone
