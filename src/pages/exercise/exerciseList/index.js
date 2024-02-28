import React, { useCallback } from "react";

function ExerciseList({
  source,
  getAssignment,
  isDoingMode,
  children,
  signalToSubmit,
}) {
  // eslint-disable-next-line no-unused-vars
  const DisplayExercise = useCallback(() => source?.map(({
    _id, title, exerciseType, content, exerciseAudio,
  }) => {
    if (!content) return null;
    const exercise = children.filter(
      (child) => child.props.type === exerciseType,
    );
    if (exercise && exercise.length > 0 && content) {
      const { detail, status, correctAnswer } = content;
      const elementReder = React.cloneElement(exercise[0].props.element, {
        key: _id,
        exId: _id,
        isDoingMode,
        detail,
        title,
        handleCollectingData: (dataSubmit) => getAssignment(dataSubmit, _id, exerciseType),
        status,
        signalToSubmit,
        exerciseAudio,
        correctAnswer,
      });
      return elementReder;
    }
    return null;
  }), [source, isDoingMode, signalToSubmit]);
  return (
    <div className="exercise-content">
      {/* {
    source?.map(({
      _id, title, exerciseType, content,
    }) => {
      if (!content) return null;
      const exercise = children.filter(
        (child) => child.props.type === exerciseType,
      );
      if (exercise && exercise.length > 0 && content) {
        const { detail, status } = content;
        return React.cloneElement(exercise[0], {
          key: _id,
          exId: _id,
          isDoingMode,
          detail,
          title,
          handleCollectingData: (dataSubmit) => getAssignment(dataSubmit, _id, exerciseType),
          status,
          signalToSubmit,
        });
      }
      return null;
    })
  } */}
      <DisplayExercise />
    </div>
  );
}

export default ExerciseList;
