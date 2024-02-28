import classNames from 'classnames'
import update from 'immutability-helper'
import React, {
  memo, useCallback, useState, useEffect,
} from 'react'
import { useSelector } from 'react-redux'
import Translation from '../../../../../../services/multi-language'
import SortElement from '../sortElement'
import './sortContainer.scss'

const SortContainer = memo(
  ({
    no,
    index,
    items,
    updateQuestion,
    status,
    isDoingMode,
    correctAnswer,
    userAnswer,
  }) => {
    const lang = useSelector((state) => state.switchLang.lang)
    const { t, ChangeLanguage } = Translation()
    useEffect(() => {
      ChangeLanguage(lang)
    }, [lang])
    const [elements, setElements] = useState(items)
    const findElement = useCallback(
      (id) => {
        const element = elements.filter((c) => `${c.elementId}` === id)[0]
        return {
          element,
          index: elements.indexOf(element),
        }
      },
      [elements],
    )
    const moveElement = useCallback(
      (id, atIndex) => {
        const { element, index: elementIndex } = findElement(id)
        const updatedElement = update(elements, {
          $splice: [
            [elementIndex, 1], // remove element at index
            [atIndex, 0, element], // insert element at atIndex
          ],
        })
        setElements(updatedElement)
        updateQuestion(index, updatedElement)
      },
      [findElement, elements, setElements],
    )
    // eslint-disable-next-line no-shadow
    function renderElements(elements) {
      const elementFlexBox = []
      const elemnentFlexItems = []
      for (let i = 0; i < elements.length / 5; i += 1) {
        for (let j = 0; j < 5; j += 1) {
          const k = i * 5 + j
          if (k >= elements.length) break
          elemnentFlexItems.push(
            <SortElement
              index={k}
              key={elements[k].elementId}
              id={`${elements[k].elementId}`}
              elementImg={elements[k].elementImg}
              moveElement={isDoingMode ? moveElement : () => {}}
              isDoingMode={isDoingMode}
              findElement={findElement}
              containerIndex={index}
              className={classNames({
                'tw-mr-0':
                  (k > 0 && (k + 1) % 5 === 0) || k === elements.length - 1,
              })}
            />,
          )
        }
        elementFlexBox.push(
          <div className="tw-flex tw-items-end tw-justify-center" key={i}>
            {elemnentFlexItems.slice()}
          </div>,
        )
        elemnentFlexItems.length = 0
      }
      return elementFlexBox
    }
    return (
      <div
        className={classNames('sort__container tw-mt-2', {
          'correct-answer': !isDoingMode && status === true,
          'wrong-answer': !isDoingMode && status === false,
        })}
      >
        <span className="tw-self-start">
          {t('exercise.question')}
&nbsp;
          {no + 1}
        </span>
        {renderElements(
          userAnswer ? userAnswer.map((i) => elements[i]) : elements,
        )}

        {correctAnswer && !status && (
          <>
            <span>Correct answer is:</span>
            {' '}
            {renderElements(correctAnswer.map((i) => elements[i]))}
          </>
        )}
      </div>
    )
  },
)

export default SortContainer
