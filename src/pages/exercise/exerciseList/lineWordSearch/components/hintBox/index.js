import React from "react"
import _ from 'lodash'

function HintBox({ hintInfo }) {
  return (
    <div className="tw-border-solid tw-border-grey tw-w-full tw-m-4 tw-rounded-md">
      <div className="tw-flex tw-flex-wrap tw-justify-around ">
        {_.shuffle(hintInfo)?.map((e) => (
          <div key={e}>
            <p className="tw-m-2">
              {e}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default HintBox;
