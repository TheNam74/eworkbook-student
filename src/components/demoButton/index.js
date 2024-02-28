/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from 'react'
import './demoButton.scss'
import classNames from 'classnames'
import { Tooltip } from 'antd';

function DemoButton({ right = false, title }) {
  return (
    <Tooltip placement="bottom" color="#ffa54e" title={title}>
      <svg
        className={classNames({ "demo-button": true, "demo-button--right": right })}
        width="160"
        height="100"
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="triangles" transform="translate(0,20)">
          <g id="lightGroup">
            <path
              id="light1"
              opacity="0.6"
              d="M53.4872 46.3509C55.7436 47.6536 55.7436 50.9105 53.4872 52.2132L13.718 75.174C11.4615 76.4767 8.64104 74.8483 8.64104 72.2428L8.64104 26.3213C8.64104 23.7158 11.4616 22.0874 13.718 23.3901L53.4872 46.3509Z"
            />
          </g>
          <g id="darkGroup">
            <path
              id="dark1"
              opacity="0.8"
              d="M74.9231 46.915C77.1795 48.2177 77.1795 51.4746 74.9231 52.7773L34.3077 76.2266C32.0513 77.5294 29.2308 75.9009 29.2308 73.2955L29.2308 26.3968C29.2308 23.7914 32.0513 22.1629 34.3077 23.4657L74.9231 46.915Z"
            />
            <path
              id="dark2"
              opacity="0.8"
              d="M54.6154 46.915C56.8718 48.2177 56.8718 51.4746 54.6154 52.7773L14 76.2266C11.7436 77.5294 8.92307 75.9009 8.92307 73.2955L8.92308 26.3968C8.92308 23.7914 11.7436 22.1629 14 23.4657L54.6154 46.915Z"
            />
          </g>
        </g>
      </svg>
    </Tooltip>
  )
}

export default DemoButton
