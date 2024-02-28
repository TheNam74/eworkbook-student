import React, { useCallback } from "react";

function HandleExercise({
  exId,
  title,
  detail,
  handleCollectingData,
  element,
  isDoingMode,
  status,
  signalToSubmit,
  exerciseAudio,
  correctAnswer,
}) {
  // console.log("HERE ==== ", element);
  const ElementDetail = useCallback(
    () => detail
      && React.cloneElement(element, {
        exId,
        detail,
        handleCollectingData,
        isDoingMode,
        title,
        status,
        signalToSubmit,
        exerciseAudio,
        correctAnswer,
      }),
    [status],
  );
  return (
    <>
      <br />
      <ElementDetail />
    </>
  );
}

export default HandleExercise;
