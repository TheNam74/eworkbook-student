/* eslint-disable max-len */
import React, { useRef } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useDrop } from 'react-dnd'
import GivenWord from "../givenWord";

function DropSpace({
  content, onClickHandler, onDrop, onCollectingData, userAnswer, isDoingMode, dragableKey,
}) {
  const droppedWord = useRef();
  const clickHandler = (id, word) => {
    onClickHandler(id, word)
    droppedWord.current = null
  }
  const dropHandler = (item) => {
    // console.log("iOver", isOver)
    onCollectingData(item, content.contextId)
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
    // hover: (monitor) => {
    //   setDropSpaceStyle("tw-border-solid tw-border-4 tw-border-secondary tw-rounded-md tw-w-full tw-min-h-[35px]")
    // },
    drop: (item) => dropHandler(item, isOver),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = isOver && canDrop;
  let style = "tw-border-solid tw-border-2 tw-border-secondary tw-rounded-md tw-w-full tw-min-h-[35px]";
  if (isActive) {
    style = "tw-border-solid tw-border-4 tw-bg-third tw-border-secondary tw-rounded-md tw-w-full tw-min-h-[35px]"
  } else {
    style = "tw-border-solid tw-border-2 tw-border-secondary tw-rounded-md tw-w-full tw-min-h-[35px]"
  }

  const imageSource = (image) => (image ? (`${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/')[image.split('/').length - 1]}`) : '');
  const image = imageSource(content.contextImg) ? imageSource(content.contextImg) : "../assets/images/no-image.jpg"
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-end tw-h-full">
      <div className="tw-w-full">
        <img className="tw-w-full tw-rounded-md tw-drop-shadow-md" src={image} alt="drop space" />
      </div>
      <div>
        <p>
          {content.context}
        </p>
      </div>
      <div ref={drop} className={style}>
        {droppedWord.current}
        {
          !isDoingMode && userAnswer
          && (userAnswer.correct
            ? (
              <span className="tw-flex tw-items-center tw-justify-between">
                <CheckCircleOutlined style={{ color: 'green', marginLeft: '5px' }} />
                <GivenWord className="tw-border-solid ! tw-border-right tw-w-4/5" id={userAnswer.answer.id} word={userAnswer.answer.word ? userAnswer.answer.word : ""} isDrag={false} />
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
    </div>
  )
}

export default DropSpace
