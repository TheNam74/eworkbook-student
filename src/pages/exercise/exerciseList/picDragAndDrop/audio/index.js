/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'

function Audio({ source }) {
  const audioSource = (audio) => (audio ? (`${process.env.REACT_APP_API_URL}/exercises/audios/${audio.split('/')[audio.split('/').length - 1]}`) : '');

  return (
    <div className="tw-mt-5">
      <audio src={audioSource(source)} controls />
    </div>
  )
}

export default Audio
