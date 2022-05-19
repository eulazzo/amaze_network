import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../redux/actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";

const CLOUDYNARY_URL = process.env.REACT_APP_CLOUDYNARY;

const NewPostForm = () => {
  
  //TODO: THIS FUNCTION HAVE TO BE REFACTORED (DOESN'T LOOK GOOD AT ALL | cognitive complexity)

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [video, setVideo] = useState("");
  const [noMessage, setNoMessage] = useState("");
  const [file, setFile] = useState(null);
  const userData = useSelector((state) => state.user.userReducer);
  const error = useSelector((state) => state.user.errorReducer.postError);

  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      data.append("video", video);

      if (file) {
        data.append("file", file);
        data.append("upload_preset", "uploads");
        const size = file.size;
        const imgType = file.type;

        const { url } = (await axios.post(CLOUDYNARY_URL, data)).data;
        dispatch(
          addPost({
            imgURL: url,
            posterId: userData._id,
            imgType,
            size,
            video,
            message,
          })
        );
        dispatch(getPosts());
        cancelPost();
      } else {
        dispatch(addPost({ posterId: userData._id, message }));
        dispatch(getPosts());
        cancelPost();
      }
    } else {
      setNoMessage("Please enter a message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
    setNoMessage("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setNoMessage("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            {/* <p>
              <span>
                {(userData.following && userData.following.length) || 0}
              </span>{" "}
              <span>
                Following
                {userData.following && userData.following.length > 1 && "s"}
              </span>
            </p>
            <p>
              <span>
                {(userData.followers && userData.followers.length) || 0}
              </span>{" "}
              <span>
                Follower
                {userData.followers && userData.followers.length > 1 && "s"}
              </span>
            </p> */}
          </div>

          <NavLink exact to="/profile">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="What's the new?"
              onChange={(e) => {
                setMessage(e.target.value);
                setNoMessage("");
              }}
              value={message}
            ></textarea>
            {(message.length || postPicture.length || video.length > 20) && (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            )}

            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Delete video</button>
                )}
              </div>

              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}

              {noMessage && (
                <span style={{ color: "gray", marginTop: "5px" }}>
                  {noMessage}
                </span>
              )}
              <div className="btn-send">
                {(message.length ||
                  postPicture.length ||
                  video.length > 20) && (
                  <button className="cancel" onClick={cancelPost}>
                    Cancel
                  </button>
                )}
                <button className="send" onClick={handlePost}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
