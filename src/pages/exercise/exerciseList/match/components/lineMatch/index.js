import './lineMatch.scss'
import React, { useEffect, useState } from 'react'
import LineTo from 'react-lineto'

function LineMatch({
  data, isDoingMode, correctAnswer, exId,
}) {
  const [lineColor, setLineColor] = useState('#2c4073aa')

  useEffect(() => {
    if (!isDoingMode) {
      if (correctAnswer.correct) {
        setLineColor('#2CB800aa')
      } else {
        setLineColor('#C50000aa')
      }
    }
  }, [isDoingMode])

  useEffect(() => {
    const line = document.getElementsByClassName('line-match')
    for (let i = 0; i < line.length; i += 1) {
      const inlineTransform = window.getComputedStyle(line[i]).transform
      // eslint-disable-next-line no-undef
      if (new WebKitCSSMatrix(inlineTransform).m42 === 0) {
        line[i].style.transform = `${inlineTransform} translateY(-50%)`
      }
    }
  }, [])

  return (
    <div>
      <LineTo
        from={
          isDoingMode
            ? `${exId}_${data.first}`
            : `${exId}_${correctAnswer.correctAnswer[0]}`
        }
        to={
          isDoingMode
            ? `${exId}_${data.second}`
            : `${exId}_${correctAnswer.correctAnswer[1]}`
        }
        delay={10}
        borderColor={lineColor}
        key={data}
        borderWidth={12}
        borderStyle="solid"
        className="line-match"
      />
    </div>
  )
}

export default LineMatch
