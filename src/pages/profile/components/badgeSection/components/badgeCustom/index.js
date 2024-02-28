import { Col, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "./badgeCustom.scss"
import React from 'react'

function BadgeCustom() {
  return (
    <Row align="middle">
      <Col span={4}>
        <Row justify="center">
          <UserOutlined style={{ fontSize: '100px', color: 'silver' }} />
          <p>Thành viên bạc</p>
        </Row>
      </Col>
      <Col offset={3}>
        <p>Tham gia trên 6 tháng </p>
      </Col>
    </Row>
  )
}
export default BadgeCustom;
