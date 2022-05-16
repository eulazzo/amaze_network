import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../AppContext";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userID = useContext(UserIdContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likers.includes(userID)) setLiked(true);
    else setLiked(false);
  }, [userID, post.likers, liked]);

  const likeHandler = () => {
    dispatch(likePost(post._id, userID));
    setLiked(true);
  };
  const unLikeHandler = () => {
    dispatch(unlikePost(post._id, userID));
    setLiked(false);
  };

  return (
    <div className="like-container">
      {!userID && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Log in to Like a post!</div>
        </Popup>
      )}

      {userID && !liked && (
        <img src="./img/icons/heart.svg" alt="like" onClick={likeHandler} />
      )}
      {userID && liked && (
        <img
          src="./img/icons/heart-filled.svg"
          alt="unlike"
          onClick={unLikeHandler}
        />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
