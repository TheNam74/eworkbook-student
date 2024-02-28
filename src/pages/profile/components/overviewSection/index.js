import "./overviewSection.scss"
import React from 'react'
import { Button, Col, Row } from "antd";
import Avatar from "./components/avatarCustom";

function OverviewSection() {
  return (
    <div className="align_content_center">
      <Row align="middle">
        <Col span={4}>
          <Avatar />
        </Col>
        <Col offset={3}>
          <Row>
            <p>duc Thang</p>
          </Row>
          <Row>
            <p>Quận 1, TP.Hồ Chí Minh</p>
          </Row>
          <Row>
            <Button className="btn--color">
              Cập nhật thông tin
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default OverviewSection;
