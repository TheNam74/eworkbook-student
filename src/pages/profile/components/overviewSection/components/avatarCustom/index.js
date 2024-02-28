import "./avatarCustom.scss"
import React from "react";
import { Image } from 'antd';

function AvatarCustom() {
  return (
    <div>
      <Image src="/assets/images/avt.jpg" preview={false} width="100%" className="avatar_border" />
    </div>
  )
}
export default AvatarCustom;
