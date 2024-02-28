import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SentenceOption from '../sentenceOption'
import Translation from '../../../../../../services/multi-language'

export default function SentenceTemplate({
  sentence,
  choseOption,
  sentenceKey,
  isDoingMode,
  no,
}) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  // 3 important field for choseOption function
  // sentenceKey: the key of the sentence
  // questionKey: the key of the question
  // optionKey: in each option of options
  function fullfilTemplate(template, questions) {
    const templateArray = template.split(' ')
    const result = []
    const regex = /^{Q\d+}$/
    for (let i = 0; i < templateArray.length; i += 1) {
      if (templateArray[i].match(regex)) {
        const questionKey = templateArray[i].slice(1, -1)
        const question = questions.find((q) => q.questionKey === questionKey)
        result.push(
          <SentenceOption
            key={questionKey}
            isDoingMode={isDoingMode}
            sentenceKey={sentenceKey}
            questionKey={questionKey}
            isFirst={i === 0}
            isLast={i === templateArray.length - 1}
            question={question}
            choseOption={choseOption}
          />,
        )
      } else {
        result.push(
          <span>
&nbsp;
            {`${templateArray[i]}`}
&nbsp;
          </span>,
        )
      }
    }
    return result
  }
  return (
    <>
      <span className="tw-self-start tw-mt-5">
        {t('exercise.question')}
&nbsp;
        {no + 1}
      </span>
      <div
        className={classNames(
          'tw-flex tw-justify-start tw-w-full tw-items-center tw-select-none',
          {
            'tw-border-wrong tw-border-solid tw-border-4 tw-p-2 tw-rounded-lg':
            sentence.isCorrect === false && !isDoingMode,
          },
          {
            'tw-border-right tw-border-solid tw-border-4 tw-p-2 tw-rounded-lg':
              sentence.isCorrect && !isDoingMode,
          },
        )}
      >
        {sentence.contextImg && (
          <img
            src={`${process.env.REACT_APP_API_URL}/exercises/images/${sentence.contextImg}`}
            alt="Sentence context"
            className=" tw-rounded-xl tw-drop-shadow-md tw-h-20 md:tw-h-32"
          />
        )}
        <div className="tw-ml-5 tw-flex tw-flex-wrap tw-items-center tw-text-black tw-text-md md:tw-text-lg">
          {fullfilTemplate(sentence.template, sentence.questions)}
        </div>
      </div>
    </>
  )
}
