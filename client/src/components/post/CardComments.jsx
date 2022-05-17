import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../redux/actions/post.actions";
import EditCommentComment from "./EditDeleteComment";
import FollowHandler from "../Profile/FollowHandler";
import { isEmpty, timestampParser } from "../Utils";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.user.userReducer);
  const usersData = useSelector((state) => state.user.usersReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>

            <div className="right-par">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type="card"
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditCommentComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}

      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Let a nice comment`}
          />
          <br />
          {/* <input type="submit" value="Post Comment" /> */}
          <button type="submit" style={{ color: "#fafafa" }}>
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default CardComments;
