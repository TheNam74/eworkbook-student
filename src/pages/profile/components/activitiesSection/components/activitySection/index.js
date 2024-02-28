import {
  Col, Row, Image, Progress, Button,
} from "antd";
import "./activitySection.scss"
import React from 'react'

function ActivitySection() {
  const progressPercent = 75;
  const resultPercent = 35;
  const alignBookCover = {
    xs: 0,
    sm: 0,
    md: 4,
    xl: 4,
    xxl: 4,
  };
  const alignProgress = {
    xs: { offset: 0, span: 10 },
    sm: { offset: 0, span: 10 },
    md: { offset: 3, span: 10 },
    xl: { offset: 3, span: 10 },
    xxl: { offset: 3, span: 10 },
  };
  return (
    <div className="padding_top">
      <Row align="middle">
        <Col {...alignBookCover}>
          <Image src="/assets/images/Let'sGoCoverImage.png" preview={false} />
        </Col>
        <Col {...alignProgress}>
          <h1 className="book_name_font">Let`s Go 4th Edition Student book</h1>
          <Row justify="space-between">
            <Col className="center_content">
              <p>Progress</p>
              <Progress type="circle" percent={progressPercent} trailColor="black" className="align_progress_content" />
            </Col>
            <Col className="center_content">
              <p>Estimated result</p>
              <Progress type="circle" percent={resultPercent} trailColor="black" />
            </Col>
          </Row>
        </Col>
        <Col offset={4}>
          <Button className="btn--color">Tiếp tục</Button>
        </Col>
      </Row>
    </div>
  )
}

export default ActivitySection;
