/* eslint-disable react/react-in-jsx-scope */
// import React, { useEffect } from 'react'
import { useDrag } from "react-dnd"
import './givenWord.scss'

function GivenWord({
  word, id, onClick, isDrag, className, dragableKey,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: isDrag ? `givenWord-${dragableKey}` : "droppedWord",
    item: { word, id },
    canDrag: isDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const hidden = isDragging ? "tw-hidden" : "";
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div ref={drag} onClick={onClick} content={word} className={`clip-long-text tw-px-4 tw-py-1 tw-bg-third tw-m-2 tw-text-primary tw-border-2 tw-border-black tw-rounded-md tw-cursor-pointer tw-text-center tw-align-middle tw-text-sm !tw-min-w-[37px] !tw-min-h-[35px] ${hidden} ${className}`}>
      {word !== "" ? word : <> &nbsp; </>}
    </div>
  )
}

export default GivenWord
