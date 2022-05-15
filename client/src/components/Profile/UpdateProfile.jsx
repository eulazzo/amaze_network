import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../redux/actions/user.actions";

import { LeftNavbar } from "../LeftNavbar";
import PopUpModel from "../PopUpModel";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
import UploadImg from "./UploadImg";

export const UpdateProfile = () => {
  const bio = useRef(null);
  const [updateForm, setUpdateForm] = useState(false);

  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const userData = useSelector((state) => state.user.userReducer);
  const usersData = useSelector((state) => state.user.usersReducer);

  const dispatch = useDispatch();

  const handlerUpdate = async () => {
    dispatch(updateBio(userData._id, bio.current.value));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNavbar />
      <h1>{userData?.pseudo} Profile</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Profile Picture</h3>
          <img src={userData?.picture} alt="userData-profile-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {!updateForm && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {userData?.bio ||
                    "Don't allow it anyone defines what you can or can't achieve"}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Change Bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={
                    userData.bio ||
                    "Don't allow it anyone defines what you can or can't achieve..."
                  }
                  ref={bio}
                ></textarea>
                <button onClick={handlerUpdate}>Save Changes</button>
              </>
            )}
          </div>

          <h4>Member since: {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(!followingPopup)}>
            Followings: {userData?.following?.length || "0"}
          </h5>
          <h5 onClick={() => setFollowersPopup(!followersPopup)}>
            Followers: {userData?.followers?.length || "0"}
          </h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h2>Following</h2>
            <span
              className="cross"
              onClick={() => setFollowingPopup(!followingPopup)}
            >
              &#10005;
            </span>
            <ul>
              {usersData?.map((user) => {
                for (const id of userData.following) {
                  if (user._id === id) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h2>Followers</h2>
            <span
              className="cross"
              onClick={() => setFollowersPopup(!followersPopup)}
            >
              &#10005;
            </span>
            <ul>
              {usersData?.map((user) => {
                for (const id of userData.followers) {
                  if (user._id === id) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
