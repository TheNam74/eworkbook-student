import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import classNames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Input, Row, Col } from 'antd';
import UnderlineAnchor from '../profile/components/anchorSection/component/underlineAnchor';
import Books from './components/books';

const { Search } = Input;

function History() {
  const [DataisLoaded] = useState([]);
  const user = useSelector((state) => state.auth.login.currentUser);

  document.title = "eWorkbook - Exercise History"
  useEffect(() => {
    const getmyRootDetail = async () => {
      try {
        // console.log("user:  ", user);
        // const response = await materialApi.getRootMaterial("sasas");
        // console.log('Fetch root detail successfully: ', response);
      } catch (error) {
        // console.log('Failed to fetch root detail: ', error);
      }
    }

    getmyRootDetail();
  }, [user]);

  if (!DataisLoaded) {
    return (
      <div>
        <h1>
          {' '}
          <LoadingOutlined />
          {' '}
          ....
          {' '}
        </h1>
      </div>
    );
  }

  const onSearch = (value) => {
    console.log('value: ', value);
  }
  return (
    <div className="history-container box">
      <div className="history-header">
        <div className="w-100 text-center pt-20">
          <h1 className="text-3xl">Your learning history</h1>
          <div className="filler h-6" />
          <h2 className="text-xl px-60 text-gray-600">All your learning-books and exercises will be stored hear. Let keep drilling them enriching your knowledge</h2>
          <div className="filler h-10" />
          <Search placeholder="input search text" onSearch={onSearch} style={{ width: 650 }} />
          <div className="filler h-10" />
          <div className="anchor">
            <Row justify="center" className="anchor_color px-30">
              <Col>
                <a href="#tongquan" className="anchor_a_style px-5">Books</a>
              </Col>
              <Col>
                <a href="#hoatdong" className="anchor_a_style px-5">Details</a>
              </Col>
            </Row>
            <Row className="anchor_color">
              <Col span={12}>
                <UnderlineAnchor underlineID="underlineTongQuan" current="underlineTongQuan" />
              </Col>
              <Col span={12}>
                <UnderlineAnchor underlineID="underlineHoatDong" current="lol" />
              </Col>
            </Row>
          </div>
          <div className="filler h-10" />
          <Books />
        </div>
      </div>
    </div>
  )
}

export default History
