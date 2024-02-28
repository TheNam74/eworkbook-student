import classNames from 'classnames'
import React, { memo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const SortElement = memo(
  ({
    id,
    index,
    elementImg,
    moveElement,
    findElement,
    containerIndex,
    className,
    isDoingMode,
  }) => {
    const ref = useRef(null)
    const originalIndex = findElement(id).index
    const [{ isDragging }, drag] = useDrag(
      () => ({
        // eslint-disable-next-line prefer-template
        type: 'element' + containerIndex,
        item: { id, originalIndex, elementImg },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
          const { id: droppedId, originalIndex: returnIndex } = item
          const didDrop = monitor.didDrop()
          if (!didDrop) {
            moveElement(droppedId, returnIndex)
          } else {
            // ref.current.style.padding = '5px'
            // setTimeout(() => {
            //   ref.current.style.padding = ''
            // }, 500);
          }
        },
      }),
      [id, originalIndex, moveElement],
    )
    const [, drop] = useDrop(
      () => ({
        // eslint-disable-next-line prefer-template
        accept: 'element' + containerIndex,
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = findElement(item.id).index
          const hoverIndex = findElement(id).index
          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
            return
          }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          // Get vertical middle
          const hoverMiddleX = hoverBoundingRect.right - hoverBoundingRect.width / 2
          // Determine mouse position
          const clientOffset = monitor.getClientOffset()
          // Get pixels to the top
          const hoverClientX = clientOffset.x
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging right
          if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return
          }
          // Dragging left
          if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return
          }
          // Time to actually perform the action
          moveElement(item.id, hoverIndex)
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
        },
      }),
      [findElement, moveElement],
    )
    drag(drop(ref))
    const propClassName = className || ''
    return (
      <div
        ref={isDoingMode ? ref : null}
        className={classNames(
          ` tw-select-none tw-cursor-pointer tw-mr-2${propClassName} md:tw-mr-5${propClassName}`,
          {
            'tw-opacity-30': isDragging,
          },
        )}
      >
        <img
          className="tw-max-w-full tw-rounded-md tw-drop-shadow-md"
          src={`${process.env.REACT_APP_API_URL}/exercises/images/${elementImg}`}
          alt="element"
        />
        <div className="tw-w-full tw-text-center tw-text-lg md:tw-text-xl tw-text-gray-700">{index + 1}</div>
      </div>
    )
  },
)

export default SortElement
