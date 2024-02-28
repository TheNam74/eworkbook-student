import { Affix, Row, Col } from "antd";
import "./anchorSection.scss";
import React from "react";
import UnderlineAnchor from "./component/underlineAnchor";

function AnchorSection(props) {
  const { current } = props;
  return (
    <Affix offsetTop={60}>
      <div>
        <Row justify="space-between" className="anchor_color">
          <Col>
            <a href="#tongquan" className="anchor_a_style">Tổng quan</a>
          </Col>
          <Col>
            <a href="#hoatdong" className="anchor_a_style">Các hoạt động</a>
          </Col>
          <Col>
            <a href="#cacdanhhieu" className="anchor_a_style">Các danh hiệu</a>
          </Col>
        </Row>
        <Row className="anchor_color">
          <Col span={8}>
            <UnderlineAnchor underlineID="underlineTongQuan" current={current} />
          </Col>
          <Col span={8}>
            <UnderlineAnchor underlineID="underlineHoatDong" current={current} />
          </Col>
          <Col span={8}>
            <UnderlineAnchor underlineID="underlineDanhHieu" current={current} />
          </Col>
        </Row>
      </div>
    </Affix>
    // <Affix offsetTop={100}>
    //   <a href="#tongquan">Test</a>
    //   <a href="#hoatdong">Test</a>
    //   <a href="#cacdanhhieu">Test</a>
    // </Affix>
  );
}

export default AnchorSection;
