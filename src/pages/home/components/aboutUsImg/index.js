import React from "react"
import { Row, Col } from 'antd'

import './aboutUsImg.scss'

function AboutUsImg() {
  return (
    <Row className="about-us-img">
      <Col md={10}>
        <div className="bg bg-img-1" />
      </Col>
      <Col md={14}>
        <Row className="about-us-img" gutter={[0, 20]}>
          <Col md={12}>
            <div className="bg bg-img-2" />
          </Col>
          <Col md={12}>
            <div className="bg bg-img-3" />
          </Col>
          <Col md={24}>
            <div className="bg bg-img-4" />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AboutUsImg
