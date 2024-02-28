import React, { useState, useRef } from "react"
import _ from 'lodash'
import classNames from "classnames"

const CELL_WIDTH = 28
const CELL_HEIGHT = 28
const CELL_FONT_SIZE = 24
const LINE_STROKE_WIDTH = CELL_FONT_SIZE * 1.1

function RenderContent({
  isDoingMode, grid, attemptSolution, questionId, userAnswer, status,
}) {
  const [proposedSolution, setProposedSolution] = useState(null)
  const [hoverCell, setHoverCell] = useState(null)
  const svg = useRef()

  function startSelection(event) {
    const coords = {
      x: event.clientX - svg.current.getBoundingClientRect().left,
      y: event.clientY - svg.current.getBoundingClientRect().top,
    }
    setProposedSolution({
      start: coords,
      end: coords,
    })
  }

  function updateSelection(event) {
    const coords = {
      x: event.clientX - svg.current.getBoundingClientRect().left,
      y: event.clientY - svg.current.getBoundingClientRect().top,
    }
    const cellCoords = {
      x: Math.floor(coords.x / CELL_WIDTH),
      y: Math.floor(coords.y / CELL_HEIGHT),
    }
    setHoverCell(cellCoords)
    setProposedSolution((prevProposedSolution) => {
      if (prevProposedSolution) {
        return {
          start: prevProposedSolution.start,
          end: coords,
        }
      }
      return prevProposedSolution
    })
  }

  function finishSelection() {
    if (!proposedSolution) {
      return
    }
    attemptSolution(
      Math.floor(proposedSolution.start.x / CELL_WIDTH),
      Math.floor(proposedSolution.end.x / CELL_WIDTH),
    )
    setProposedSolution(null)
  }

  function handleMouseDown(event) {
    if (proposedSolution) {
      return
    }

    startSelection(event)
    event.preventDefault()
  }

  function handleMouseMove(event) {
    updateSelection(event)
    event.preventDefault()
  }

  function handleMouseUp(event) {
    if (proposedSolution) {
      const { start, end } = proposedSolution
      if (!_.isEqual(start, end)) {
        finishSelection()
        event.preventDefault()
      }
    }
  }

  function handleMouseLeave() {
    setHoverCell(null)
  }

  function handleTouchStart(event) {
    startSelection(event.touches[0])
    event.preventDefault()
  }

  function handleTouchMove(event) {
    event.preventDefault()
    updateSelection(event.touches[0])
  }

  function handleTouchCancel() {
    setHoverCell(null)
    setProposedSolution(null)
  }

  function handleTouchEnd(event) {
    finishSelection()
    setHoverCell(null)
    setProposedSolution(null)
    event.preventDefault()
  }

  const interactiveProps = {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchCancel: handleTouchCancel,
    onTouchEnd: handleTouchEnd,
  }
  return (
    <svg
      className="tw-fill-black tw-select-none tw-touch-none"
      xmlns="http://www.w3.org/2000/svg"
      width={CELL_WIDTH * grid.length}
      height={CELL_HEIGHT}
      {...(isDoingMode ? interactiveProps : {})}
      ref={svg}
    >
      {hoverCell && (
        <rect
          className={classNames('tw-fill-[#d4d4d4] tw-fill-opacity-10', { 'tw-cursor-pointer': isDoingMode })}
          x={hoverCell.x * CELL_WIDTH}
          y={CELL_HEIGHT}
          width={CELL_WIDTH}
          height={CELL_HEIGHT}
        />
      )}
      {
        !isDoingMode && status && userAnswer && "answer" in userAnswer && (
          <line
            className={classNames(`tw-opacity-50`, userAnswer.correct ? `tw-stroke-primary` : `tw-stroke-[#B50000]`)}
            strokeWidth={LINE_STROKE_WIDTH}
            strokeLinecap="round"
            x1={userAnswer.answer.position * CELL_WIDTH + CELL_WIDTH / 2}
            y1={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
            x2={(userAnswer.answer.position + userAnswer.answer.length - 1)
              * CELL_WIDTH + CELL_WIDTH / 2}
            y2={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
          />
        )
      }
      {
        !isDoingMode && status && userAnswer && "answer" in userAnswer && !userAnswer.correct && (
          <line
            className={classNames(`tw-opacity-50`, `tw-stroke-[#2CA800]`)}
            strokeWidth={LINE_STROKE_WIDTH}
            strokeLinecap="round"
            x1={userAnswer.correctAnswer.position * CELL_WIDTH + CELL_WIDTH / 2}
            y1={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
            x2={(userAnswer.correctAnswer.position + userAnswer.correctAnswer.length - 1)
              * CELL_WIDTH + CELL_WIDTH / 2}
            y2={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
          />
        )
      }
      {
        !isDoingMode && status && userAnswer && !("answer" in userAnswer) && (
          <line
            className={classNames(`tw-opacity-50`, `tw-stroke-[#2CA800]`)}
            strokeWidth={LINE_STROKE_WIDTH}
            strokeLinecap="round"
            x1={userAnswer.correctAnswer.position * CELL_WIDTH + CELL_WIDTH / 2}
            y1={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
            x2={(userAnswer.correctAnswer.position + userAnswer.correctAnswer.length - 1)
              * CELL_WIDTH + CELL_WIDTH / 2}
            y2={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
          />
        )
      }
      {
        !status && userAnswer
        && (
        <line
          className={classNames(`tw-opacity-50`, `tw-stroke-primary`)}
          strokeWidth={LINE_STROKE_WIDTH}
          strokeLinecap="round"
          x1={userAnswer.start * CELL_WIDTH + CELL_WIDTH / 2}
          y1={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
          x2={userAnswer.end * CELL_WIDTH + CELL_WIDTH / 2}
          y2={0 * CELL_HEIGHT + CELL_HEIGHT / 2}
        />
        )
      }
      {proposedSolution && (
        <line
          className="tw-stroke-secondary tw-opacity-50"
          key="_proposed_solution"
          strokeWidth={LINE_STROKE_WIDTH}
          strokeLinecap="round"
          x1={proposedSolution.start.x}
          x2={proposedSolution.end.x}
          y1={proposedSolution.start.y}
          y2={proposedSolution.end.y}
        />
      )}
      {grid.map((letter, letterIndex) => (
        <text
          className={classNames({ 'tw-cursor-pointer': isDoingMode })}
          key={[questionId, letterIndex]}
          x={letterIndex * CELL_WIDTH + CELL_WIDTH / 2}
          y={CELL_HEIGHT / 2}
          fontWeight="bold"
          fontSize={CELL_FONT_SIZE}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {letter}
        </text>
      ))}
    </svg>
  )
}
export default RenderContent
