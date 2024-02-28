import { Statistic } from 'antd';
import React, { useRef } from 'react';
import './countdown.scss'

const { Countdown } = Statistic;
function CountDown({ time, onTimeOut }) {
  const deadline = useRef(Date.now() + time * 1000);
  return (
    <Countdown
      className="exam-counter"
      title="Time left:"
      value={deadline.current}
      onFinish={() => {
        onTimeOut();
      }}
    />
  )
}

export default CountDown
