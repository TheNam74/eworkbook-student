import { Col, Row } from "antd";
import React from 'react'
import "./personalInformationSection.scss"

function PersonalInformationSection() {
  return (
    <div className="curly_border">
      <div className="header_align">
        <h1>Tổng quan</h1>
      </div>
      <div className="align_content_center">
        <Row>
          <Col span={4}>
            <Row justify="end">Họ tên:</Row>
            <Row justify="end">Ngày sinh:</Row>
            <Row justify="end">Học vấn:</Row>
            <Row justify="end">Khu vực sống:</Row>
            <Row justify="end">Tên tài khoản:</Row>
            <Row justify="end">Ngày tham gia:</Row>
          </Col>
          <Col className="align_left" offset={3}>
            <Row>Đặng Thắng</Row>
            <Row>01/01/1990</Row>
            <Row>Đại học</Row>
            <Row>Quận 1, TP.Hồ Chí Minh</Row>
            <Row>duc thang</Row>
            <Row>20/05/2022</Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default PersonalInformationSection;
