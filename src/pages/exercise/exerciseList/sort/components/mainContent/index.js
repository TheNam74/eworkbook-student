/* eslint-disable react/no-danger */
import React from 'react'
import './mainContent.scss'

function MainContent({ classNames, html }) {
  if (!html || html === '<p></p>') return null
  html = html.replace('/api', process.env.REACT_APP_API_URL)
  return (
    <div
      className={`${classNames} tw-mt-5 tw-mb-5`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default MainContent
