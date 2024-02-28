import {
  Avatar, Comment, List, Pagination, Button, Form,
} from "antd";
import "./ratingComment.scss"
import moment from "moment";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Translation from '../../../../../services/multi-language';
import ratingApi from "../../../../../api/ratingApi";
import CommentElement from "../commentElement";
import Editor from "../editor";

function CommentList({ comments }) {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return <List dataSource={comments} header={`${comments.length} ${comments.length > 1 ? t("rating.replies") : t("rating.reply")}`} itemLayout="horizontal" renderItem={(props) => <Comment {...props} />} />;
}

function RatingComment({
  materialId, starFilter, totalRatingNumber, setTotalRatingNumber, setStarFilter,
}) {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  // current user
  const user = useSelector((state) => state.auth.login.currentUser);

  // star filter change
  const [filterChange, setFilterChange] = useState(true);

  // function to map data from response to comment type
  const convertToComment = (item) => ({
    author: item.userId.lastName,
    avatar: `${process.env.REACT_APP_API_URL}/users/images/${item.userId.avatar}`,
    content: <CommentElement
      ratingId={item._id}
      value={item.content.ratingText}
      ratingStar={item.content.star}
      upVote={item.upVote}
      downVote={item.downVote}
    />,
    datetime: moment(item.createdDate).locale(lang).fromNow(),
  })

  const handleStarFilterChange = async () => {
    try {
      const response = await ratingApi.getRatingByMaterialId({
        materialId,
        "content.star": starFilter,
      });
      setTotalRatingNumber(response.length);
    } catch (error) {
      // console.log("Failed to fetch comments list: ", error);
    }
  }

  // get the comments
  const [comments, setComments] = useState([]);

  const getRatings = async () => {
    try {
      const response = await ratingApi.getRatingByMaterialId({
        materialId,
        page: 1,
        pageSize: 5,
        "content.star": starFilter,
      });
      const commentResult = response.map((item) => convertToComment(item));
      setComments(commentResult);
    } catch (error) {
      // console.log("Failed to fetch comments list: ", error);
    }
  };

  useEffect(() => {
    if (materialId === undefined) {
      setComments([]);
    } else {
      getRatings();
    }
    handleStarFilterChange();
    setFilterChange(!filterChange);
  }, [materialId, starFilter]);

  const [currentUserComment, setCurrentUserComment] = useState(null);

  useEffect(() => {
    if (materialId === undefined) return;
    const getRatingsWithUserId = async () => {
      try {
        const response = await ratingApi.getUserRating({
          materialId,
          userId: user._id || user.id,
        });
        if (response.data === "") return;
        setCurrentUserComment(convertToComment(response));
      } catch (error) {
        // console.log("Fail to fetch user comment data: ", error)
      }
    }
    getRatingsWithUserId();
  }, [materialId]);

  // submit
  const [submitting, setSubmitting] = useState(false);

  // text value
  const [value, setValue] = useState("");

  // rating value
  const [ratingStar, setRatingStar] = useState(3);

  // handle page changing
  const [currentPage, setCurrentPage] = useState(1);
  const onPaginationChange = async (page, pageSize) => {
    try {
      const response = await ratingApi.getRatingByMaterialId({
        materialId,
        page,
        pageSize,
        "content.star": starFilter,
      });
      const commentResult = response.map((item) => convertToComment(item));
      setComments(commentResult);
      setCurrentPage(page);
    } catch (error) {
      // console.log("Failed to fetch comments list when change page: ", error);
    }
  }

  // submit
  const handleSubmit = async () => {
    if (!value) return;
    setSubmitting(true);
    let createdRating = {};
    setTimeout(async () => {
      setSubmitting(false);
      setValue("");
      createdRating = await ratingApi.createRating({
        materialId,
        userId: user._id || user.id,
        createdDate: Date.now(),
        content: {
          ratingText: value,
          star: ratingStar,
        },
        upVote: 0,
        downVote: 0,
      });
    }, 1000);
    const newComment = {
      author: user.name,
      avatar: `${process.env.REACT_APP_API_URL}/users/images/${user.avatar}`,
      content: <CommentElement
        ratingId={createdRating._id}
        value={value}
        ratingStar={ratingStar}
        upVote={0}
        downVote={0}
      />,
      datetime: moment().fromNow(),
    };
    await setStarFilter([]);
    await onPaginationChange(1, 5);
    setComments((prev) => ([
      newComment,
      ...prev,
    ]));
    setCurrentUserComment(newComment);
  };
  const handleTextChange = (e) => {
    setValue(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRatingStar(e);
  };

  // edit
  const [editMode, setEditMode] = useState("Normal");
  const handleEdit = () => {
    setValue(currentUserComment.content.props.value);
    setRatingStar(currentUserComment.content.props.ratingStar);
    setEditMode("IsEditing")
  }

  const handleSubmitEditing = async () => {
    try {
      const response = await ratingApi.updateRating({
        _id: currentUserComment.content.props.ratingId,
        materialId,
        userId: user._id || user.id,
        createdDate: Date.now(),
        content: {
          ratingText: value,
          star: ratingStar,
        },
        upVote: currentUserComment.content.props.upVote,
        downVote: currentUserComment.content.props.downVote,
      });
      setCurrentUserComment(convertToComment(response));
      setEditMode("Normal");
      await onPaginationChange(currentPage, 5);
    } catch (error) {
      // console.log("Failed to update rating when change edit: ", error);
    }
  }

  return (
    <>
      {currentUserComment === null
        && <Comment avatar={<Avatar src={`${process.env.REACT_APP_API_URL}/users/images/${user.avatar}`} alt="Avatar" />} content={<Editor action="Add" onTextChange={handleTextChange} onRatingChange={handleRatingChange} onSubmit={handleSubmit} submitting={submitting} value={value} ratingStar={ratingStar} />} />}

      {currentUserComment !== null && editMode === "Normal"
        && (
          <div>
            <Comment {...currentUserComment} />
            <Form.Item>
              <Button htmlType="submit" onClick={handleEdit} type="primary" className="tw-ml-11">
                {t("rating.editRating")}
              </Button>
            </Form.Item>
          </div>
        )}
      {currentUserComment !== null && editMode === "IsEditing"
        && (
          <Comment avatar={<Avatar src={`${process.env.REACT_APP_API_URL}/users/images/${user.avatar}`} alt="Avatar" />} content={<Editor action="Edit" onTextChange={handleTextChange} onRatingChange={handleRatingChange} onSubmit={handleSubmitEditing} submitting={submitting} value={value} ratingStar={ratingStar} />} />
        )}

      {comments.length > 0 && <CommentList comments={comments} />}

      {comments.length > 0
        && (
          <Pagination
            className="tw-col-span-full tw-mt-8 paging-center"
            pageSize={5}
            total={totalRatingNumber}
            onChange={onPaginationChange}
            current={currentPage}
          />
        )}

    </>
  );
}

export default RatingComment;
