import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Translation from '../../../../../../services/multi-language'

export function WordList({
  words, showWordHints, setWordHinted, className, decorColorGen, isDoingMode,
}) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  React.useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  setWordHinted = showWordHints ? setWordHinted : () => null
  return (
    <div className={`${className} tw-mb-5`}>
      <div className={classNames("tw-rounded-t-lg tw-px-[2rem] tw-mx-auto tw-text-center tw-text-white tw-bg-primary", { "tw-bg-secondary": !isDoingMode })}>
        {isDoingMode ? t('exercise.wordsearch.findWords') : t('exercise.wordsearch.hint')}
      </div>
      <div className={classNames("tw-rounded-b-lg tw-border-2 tw-border-primary tw-border-solid", { "tw-border-secondary": !isDoingMode })}>
        <ul className="tw-list-none tw-text-center tw-text-base tw-select-none tw-text-black tw-p-0 tw-mb-0 tw-mt-1">
          {Object.values(words)
            .filter((word) => !word.solved)
            .map(({ word, hinted }) => (
              <li
                key={word}
                className={classNames('tw-border-b-primary tw-border-solid tw-border-x-0 tw-border-t-0', { 'tw-bg-secondary': hinted }, { 'tw-cursor-pointer  tw-border-b-secondary': !isDoingMode })}
                onMouseOut={() => setWordHinted(word, false)}
                onBlur={() => setWordHinted(word, false)}
                onMouseOver={() => setWordHinted(word, true)}
                onFocus={() => setWordHinted(word, true)}
              >
                {word}
              </li>
            ))}
          {Object.values(words)
            .filter((word) => word.solved)
            .map(({ word }) => (
              <li
                key={word}
                className={`tw-line-through tw-text-gray-500 tw-decoration-2 ${decorColorGen(words, word)}`}
              >
                {word}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default WordList
