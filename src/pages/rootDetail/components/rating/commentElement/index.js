/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  DislikeOutlined, LikeOutlined, LikeFilled, DislikeFilled,
} from "@ant-design/icons";
import {
  Rate, Tooltip,
} from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ratingApi from "../../../../../api/ratingApi";

function CommentElement({
  value, ratingStar, upVote, downVote, ratingId,
}) {
  // current user
  const user = useSelector((state) => state.auth.login.currentUser);
  // set action
  const [action, setAction] = useState("");
  useEffect(() => {
    if (ratingId === undefined) {
      setAction("");
    } else {
      const getSingleVoting = async () => {
        try {
          const response = await ratingApi.getSingleVotingByUserIdAndRatingId({
            userId: user._id || user.id,
            ratingId,
          });
          if (!response) {
            return;
          }
          setAction(response.type);
        } catch (error) {
          // console.log("Failed to fetch voting list: ", error);
        }
      };
      getSingleVoting();
    }
  }, [ratingId])

  const [upVoteNumber, setUpVoteNumber] = useState(0)
  const [downVoteNumber, setDownVoteNumber] = useState(0)

  useEffect(() => {
    setUpVoteNumber(upVote)
  }, [upVote])

  useEffect(() => {
    setDownVoteNumber(downVote)
  }, [downVote])

  const Like = () => {
    if (action === "Like") return;
    if (action === "Dislike") setDownVoteNumber(downVoteNumber - 1);
    ratingApi.createVoting({
      userId: user._id || user.id,
      ratingId,
      type: "Like",
    })
    setAction("Like");
    setUpVoteNumber(upVoteNumber + 1);
  };
  const Disklike = () => {
    if (action === "Dislike") return;
    if (action === "Like") setUpVoteNumber(upVoteNumber - 1);
    ratingApi.createVoting({
      userId: user._id || user.id,
      ratingId,
      type: "Dislike",
    })
    setAction("Dislike")
    setDownVoteNumber(downVoteNumber + 1);
  };
  return (
    <div>
      <Rate value={ratingStar} disabled />
      <p>{value}</p>
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={Like} onKeyDown={Like}>
          {action === "Like" ? <LikeFilled /> : <LikeOutlined />}
        </span>
        {'  '}
        {upVoteNumber}
      </Tooltip>
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span className="tw-ml-5" onClick={Disklike} onKeyDown={Disklike}>
          {action === "Dislike" ? <DislikeFilled /> : <DislikeOutlined />}
        </span>
        {'  '}
        {downVoteNumber}
      </Tooltip>
    </div>
  );
}

export default CommentElement
