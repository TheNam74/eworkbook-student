import "./badgeSection.scss"
import React from 'react'
import BadgeCustom from "./components/badgeCustom";

function BadgeSection() {
  return (
    <div className="curly_border">
      <div className="header_align">
        <h1>Các danh hiệu</h1>
      </div>
      <div className="align_content_center">
        <BadgeCustom />
        <BadgeCustom />
        <BadgeCustom />
      </div>
    </div>
  )
}

export default BadgeSection;
