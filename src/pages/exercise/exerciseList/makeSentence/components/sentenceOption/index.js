/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import React from 'react'

export default function SentenceOption({
  question,
  isFirst,
  isLast,
  choseOption,
  sentenceKey,
  questionKey,
  isDoingMode,
}) {
  const { options } = question
  const res = []
  for (let i = 0; i < options.length; i += 1) {
    res.push(
      <div
        key={options[i].key}
        onClick={() => (isDoingMode
          ? choseOption(sentenceKey, questionKey, options[i].key)
          : null)}
        className={classNames(
          'tw-p-1 tw-w-fit tw-rounded-lg tw-text-primary',
          {
            'hover:tw-shadow-[inset_0_0_0_2px_#6678a6] tw-cursor-pointer tw-transition tw-duration-300 tw-ease-in-out': isDoingMode,
          },
          {
            'tw-mb-1 md:tw-mb-2': !(i === options.length - 1),
          },
          {
            'tw-bg-primary tw-bg-opacity-20 !tw-text-black': options[i].chosen,
          },
          {
            '!tw-bg-wrong !tw-bg-opacity-20 !tw-text-black': options[i].chosen && options[i].isCorrect === false && !isDoingMode,
          },
          {
            '!tw-bg-right !tw-bg-opacity-20 !tw-text-black': !options[i].chosen && options[i].isCorrect && !isDoingMode,
          },
        )}
      >
        {options[i].option}
      </div>,
    )
  }

  return (
    <div
      className={classNames(
        { 'tw-ml-4': !isFirst },
        { 'tw-mr-4': !isLast },
      )}
    >
      {res}
    </div>
  )
}
