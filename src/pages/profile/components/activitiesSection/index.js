import "./activitiesSection.scss"
import React from 'react'
import ActivitySection from "./components/activitySection"

function ActivitiesSection() {
  return (
    <div className="curly_border">
      <div className="header_align">
        <h1>Các hoạt động</h1>
      </div>
      <div className="align_content_center">
        <ActivitySection />
        <ActivitySection />
        <ActivitySection />
      </div>
    </div>
  )
}
export default ActivitiesSection;
