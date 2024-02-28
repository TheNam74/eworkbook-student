import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ExerciseItem from '../exerciseItem'
import ExerciseSelectorButton from '../exerciseSelectorButton'
import CountDown from '../countdown';
import Translation from '../../../../services/multi-language'

function ExerciseSelector({ exerciseItems, handleConfirm, timeControl }) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  if (exerciseItems.length === 0) {
    return (
      <div>
        <span className="tw-ml-5 tw-text-primary tw-text-lg tw-font-medium">No exercise yet.</span>
      </div>
    )
  }
  return (
    <div className="tw-flex lg:tw-flex-col md:tw-flex-row sm:tw-flex-row tw-items-center tw-border-solid tw-border-2 tw-border-primary tw-rounded-md tw-p-5 tw-top-40 tw-right-20">
      <div className="tw-w-full tw-bg-primary tw-rounded-md tw-text-white tw-py-2 tw-px-1 tw-text-center tw-text-lg">
        {t('exercise.exerciseSelector')}
      </div>
      {timeControl && (
      <CountDown
        time={timeControl.time}
        onTimeOut={timeControl.onTimeOut}
      />
      ) }
      <div className="tw-flex tw-w-full lg:tw-flex-col md:tw-flex-row sm:tw-flex-row tw-items-center tw-p-3 tw-justify-between">
        {
          exerciseItems.map((item, index) => (
            <ExerciseItem index={index} id={item._id} key={item._id} />
          ))
        }
      </div>
      {handleConfirm && <ExerciseSelectorButton handleConfirm={handleConfirm} />}
    </div>
  )
}

export default ExerciseSelector;
