import "./matchCol.scss"
import React, { useState, useEffect } from 'react';
import MatchElement from "../matchElement";

function MatchCol({
  colKey,
  colData,
  onChosen,
  isOneButtonChoosen,
  totalCol,
  colCanChoose,
  sideCanChoosse,
  clear,
  isDoingMode,
  exId,
}) {
  const [colButtonChoosen, setColButtonChoosen] = useState(false);
  const choosenButton = (buttonId) => {
    onChosen(buttonId);
    setColButtonChoosen(true);
  };
  const functionUpdateCol = () => {
    if (!isOneButtonChoosen) {
      setColButtonChoosen(false);
    }
  }
  const genKey = (key) => `${exId}_${key}`
  useEffect(functionUpdateCol, [isOneButtonChoosen]);
  return (
    <div className="tw-flex tw-flex-col tw-h-full">
      {colData.map((data, index) => (
        <MatchElement
          key={genKey(index)}
          elementData={data}
          onChoosen={choosenButton}
          colInChoosing={colButtonChoosen}
          currentColKey={colKey}
          totalCol={totalCol}
          colCanChoose={colCanChoose}
          sideCanChoosse={sideCanChoosse}
          clear={clear}
          isDoingMode={isDoingMode}
          exId={exId}
        />
        // <div className="matchElement_container" key={data.id}>
        // </div>
      ))}
    </div>
  )
}

export default MatchCol;
