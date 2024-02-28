import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import classNames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import pairApi from '../../api/pairApi';

function Pair() {
  const [DataisLoaded, setDataisLoaded] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const user = useSelector((state) => state.auth.login.currentUser);
  const studentid = user._id || user.id;
  const { teacherid } = useParams();

  useEffect(() => {
    const getOrCreatePair = async () => {
      try {
        // console.log("user:  ", user);
        const response = await pairApi.getOrCreatePair(teacherid, studentid);
        // console.log('Fetch root detail successfully: ', response);
        if (response.teacher) {
          setTeacher(response.teacher);
          // console.log('teahcre', response.teacher)
          setDataisLoaded(true);
        }
      } catch (error) {
        console.log('Failed to fetch ', error);
        // console.log('Failed to fetch root detail: ', error);
      }
    }

    getOrCreatePair();
  }, [studentid]);

  if (!teacher || !DataisLoaded) {
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

  return (
    <div className="pair-container box">
      <div className="tw-text-center tw-font-bold tw-text-4xl">
        <br />
        <br />
        <br />
        <br />
        You are now pairing with teacher:
        {' '}
        <span className="tw-text-primary">
          {teacher.name}
          {' '}
          {teacher.email}
        </span>
        <br />
        <br />
        <Link to="/">
          <Button className=" tw-h-20 tw-w-80 tw-text-lg  tw-rounded-sm tw-bg-primary tw-text-white">
            Back home
          </Button>
        </Link>

        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

export default Pair
