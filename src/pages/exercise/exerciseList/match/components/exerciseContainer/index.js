import React from 'react'
import './exerciseContainer.scss'

function ExerciseContainer({
  width, height, classNames, html,
}) {
  html = html.replace("/api", process.env.REACT_APP_API_URL);
  return (
    // eslint-disable-next-line react/no-danger
    <div className={`${width} ${height} ${classNames} tw-flex tw-justify-between`} dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default ExerciseContainer
