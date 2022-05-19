import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";

import FollowHandler from "../Profile/FollowHandler";
import LikeButton from "./LikeButton";
import { updatePostDescription } from "../../redux/actions/post.actions";
import DeleteCard from "./DeleteCard/DeleteCard";
import CardComment from "./CardComments";
import { BiEdit } from "react-icons/bi";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [textUpdated, setTextUpdated] = useState(null);
  const userData = useSelector((state) => state.user.userReducer);
  const usersData = useSelector((state) => state.user.usersReducer);
  const dispatch = useDispatch();

  const updatedItem = () => {
    if (textUpdated) {
      dispatch(updatePostDescription(post._id, textUpdated));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>

          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) return user.pseudo;
                      return null;
                    })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {!isUpdated && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdated(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updatedItem}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            {post.picture !== undefined && (
              <img src={post.picture} alt="post-pic" className="card-pic"></img>
            )}
            {/* {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture   "
                allowFullScreen
                title={post._id}
              ></iframe>
            )} */}
            {userData._id === post.posterId && (
              <div
                className="button-container"
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                  backgroundColor: "#fafafa",
                }}
              >
                <BiEdit
                  onClick={() => setIsUpdated(!isUpdated)}
                  color="#000"
                  size={"20px"}
                  className="editButton"
                />
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComment post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
