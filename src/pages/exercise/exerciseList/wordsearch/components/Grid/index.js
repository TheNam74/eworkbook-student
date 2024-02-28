import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

const CELL_WIDTH = 40
const CELL_HEIGHT = 40
const CELL_FONT_SIZE = 24
const LINE_STROKE_WIDTH = CELL_FONT_SIZE * 0.7

function Grid({
  attemptSolution, words, grid, strokeColorGen, isDoingMode,
}) {
  const [proposedSolution, setProposedSolution] = useState(null)
  const [hoverCell, setHoverCell] = useState(null)
  const svg = useRef()

  function renderBorder() {
    const border = []
    for (let i = 0; i <= grid.length; i += 1) {
      border.push(
        <line
          key={`horizontal-border-${i}`}
          x1={0}
          y1={i * CELL_HEIGHT}
          x2={grid[0].length * CELL_WIDTH}
          y2={i * CELL_HEIGHT}
          stroke="gray"
          strokeWidth={2}
        />,
      )
    }
    for (let i = 0; i <= grid[0].length; i += 1) {
      border.push(
        <line
          key={`vertical-border-${i}`}
          x1={i * CELL_WIDTH}
          y1={0}
          x2={i * CELL_WIDTH}
          y2={grid.length * CELL_HEIGHT}
          stroke="gray"
          strokeWidth={2}
        />,
      )
    }
    return border
  }

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
      {
        x: Math.floor(proposedSolution.start.x / CELL_WIDTH),
        y: Math.floor(proposedSolution.start.y / CELL_HEIGHT),
      },
      {
        x: Math.floor(proposedSolution.end.x / CELL_WIDTH),
        y: Math.floor(proposedSolution.end.y / CELL_HEIGHT),
      },
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
    <div>
      <svg
        className="tw-fill-black tw-select-none tw-touch-none"
        xmlns="http://www.w3.org/2000/svg"
        width={CELL_WIDTH * grid[0].length}
        height={CELL_HEIGHT * grid.length}
        {...(isDoingMode ? interactiveProps : {})}
        ref={svg}
      >
        {hoverCell && (
          <rect
            className={classNames('tw-fill-[#d4d4d4] tw-fill-opacity-10', { 'tw-cursor-pointer': isDoingMode })}
            x={hoverCell.x * CELL_WIDTH}
            y={hoverCell.y * CELL_HEIGHT}
            width={CELL_WIDTH}
            height={CELL_HEIGHT}
          />
        )}
        {Object.values(words)
          .filter((word) => word.hinted || word.solved)
          .map(({
            word, start, end, hinted,
            // , solved,
          }) => (
            <line
              className={classNames(`tw-opacity-50 ${strokeColorGen(words, word)}`, { 'tw-stroke-secondary': hinted })}
              key={word}
              strokeWidth={LINE_STROKE_WIDTH}
              strokeLinecap="round"
              x1={start.x * CELL_WIDTH + CELL_WIDTH / 2}
              y1={start.y * CELL_HEIGHT + CELL_HEIGHT / 2}
              x2={end.x * CELL_WIDTH + CELL_WIDTH / 2}
              y2={end.y * CELL_HEIGHT + CELL_HEIGHT / 2}
            />
          ))}
        {proposedSolution && (
          <line
            className="tw-stroke-primary tw-opacity-50"
            key="_proposed_solution"
            strokeWidth={LINE_STROKE_WIDTH}
            strokeLinecap="round"
            x1={proposedSolution.start.x}
            x2={proposedSolution.end.x}
            y1={proposedSolution.start.y}
            y2={proposedSolution.end.y}
          />
        )}
        {grid.map((row, y) => row.map((letter, x) => (
          <text
            className={classNames({ 'tw-cursor-pointer': isDoingMode })}
            key={[x, y]}
            x={x * CELL_WIDTH + CELL_WIDTH / 2}
            y={y * CELL_HEIGHT + CELL_HEIGHT / 2}
            fontWeight="bold"
            fontSize={CELL_FONT_SIZE}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {letter}
          </text>
        )))}
        {renderBorder()}
      </svg>
    </div>
  )
}

export default Grid
