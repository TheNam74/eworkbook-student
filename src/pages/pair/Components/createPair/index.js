import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { CopyTwoTone } from '@ant-design/icons';

function CreatePair() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const studentid = user?._id || user?.id;

  return (
    <div className="pair-container box">
      <div className="tw-text-center tw-font-bold tw-text-4xl">
        <br />
        <br />
        <br />
        <br />
        Copy and send this link to your teacher:
        {' '}
        <i className="tw-text-primary">
          {`https://teacher.eworkbook.me/pair/${studentid}`}
        </i>

        <Button
          className="tw-ml-3 tw-relative tw-bottom-2"
          onClick={() => {
            navigator.clipboard.writeText(`https://teacher.eworkbook.me/pair/${studentid}`);
          }}
        >
          <CopyTwoTone />
        </Button>

        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

export default CreatePair
