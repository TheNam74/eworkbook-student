import "./underlineAnchor.scss"
import React from "react";

function UnderlineAnchor(props) {
  const { underlineID, current } = props
  let underlineColor = "black_underline"
  if (underlineID === current || underlineID === current?.current) {
    underlineColor = "blue_underline"
  }
  return (
    <hr className={underlineColor} />
  )
}

export default UnderlineAnchor;
