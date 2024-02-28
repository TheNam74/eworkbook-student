import "./lineMatchList.scss"
import React from 'react'
import LineMatch from "../lineMatch";

function LineMatchList({
  matchButton, isDoingMode, correctAnswer, exId,
}) {
  const data = matchButton && matchButton?.length > 0 ? matchButton : correctAnswer;
  return (
    <div>
      {data?.map((userData, index) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <span key={index + exId}>
          {!Number.isNaN(userData.first) && !Number.isNaN(userData.second)
          && (
          <LineMatch
            data={userData}
            isDoingMode={isDoingMode}
            correctAnswer={correctAnswer && correctAnswer.length > 0 ? correctAnswer[index] : {}}
            key={userData.first + userData.second + exId}
            exId={exId}
          />
          )}
        </span>
      ))}
    </div>
  );
}

export default LineMatchList;
