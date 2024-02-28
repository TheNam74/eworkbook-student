import React from 'react'

function ExerciseItem({ index, id }) {
  return (
    <a href={`#${id}`} className="tw-bg-[#f1f1f1] tw-w-3/5 tw-m-1 tw-text-center tw-bg-odd-text tw-rounded-md tw-p-2 hover:tw-bg-primary hover:tw-text-white tw-duration-150 hover:tw-cursor-pointer">
      {+index + 1}
    </a>
  )
}

export default ExerciseItem
