import React, { useState, useEffect } from "react";
import { Image } from "antd";
import RenderContent from "../renderContent";
import "./lineWordSearchComponent.scss"

function LineWordSearchComponent({
  questionContent, isDoingMode, updateUserAnswer, status,
}) {
  const [userAnswer, setUserAnswer] = useState(null);
  const imageSource = (image) => {
    if (image) {
      return `${process.env.REACT_APP_API_URL}/exercises/images/${image.split('/')}`
    }
    return "../assets/images/no-image.jpg";
  }
  useEffect(() => {
    if (status) {
      for (let i = 0; i < status.length; i += 1) {
        if (status[i].correctAnswer.questionId === questionContent.questionId) {
          setUserAnswer((status[i]));
          break;
        }
      }
    }
  }, [status])
  const attemptSolution = (start, end) => {
    const from = start < end ? start : end;
    const to = start > end ? start : end;
    const length = Math.abs(end - start) + 1;
    setUserAnswer({ start: from, end: to });
    updateUserAnswer({
      questionId: questionContent.questionId,
      position: from,
      length,
    })
  }
  return (
    <div className="tw-mt-2 tw-text-center tw-bg-white tw-p-4 tw-rounded-md tw-flex tw-flex-col tw-justify-between">
      <div className="line-word-search__image--big tw-max-w-sm tw-h-full">
        <div className="tw-h-full tw-flex tw-justify-center tw-items-center">
          <Image alt="Exercise picture" src={imageSource(questionContent.image)} preview={false} className="tw-rounded-md" />
        </div>
      </div>
      <div className="tw-flex tw-justify-center tw-mt-2">
        <RenderContent
          isDoingMode={isDoingMode}
          grid={[...questionContent.content]}
          questionId={questionContent.questionId}
          attemptSolution={attemptSolution}
          userAnswer={userAnswer}
          status={status}
        />
      </div>
    </div>
  )
}
export default LineWordSearchComponent;
