import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);

  const [friendsHint, setFriendsHint] = useState([]);
  const usersData = useSelector((state) => state.user.usersReducer);
  const userData = useSelector((state) => state.user.userReducer);

  useEffect(() => {
    const notFriendList = () => {
      const suggestionUsers = usersData
        .filter(
          (user) =>
            user._id !== userData._id && !user.followers.includes(userData._id)
        )
        .sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        suggestionUsers.length = 5;
      } else if (window.innerHeight > 720) {
        suggestionUsers.length = 4;
      } else if (window.innerHeight > 615) {
        suggestionUsers.length = 3;
      } else if (window.innerHeight > 540) {
        suggestionUsers.length = 1;
      } else {
        suggestionUsers.length = 0;
      }

      setFriendsHint(suggestionUsers);
    };
    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [playOnce, usersData, userData]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fa fas-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint?.map((user) => (
              <li className="user-hint" key={user}>
                <img src={user.picture} alt="suggestion-user-pic" />
                <p>{user.pseudo}</p>
                <FollowHandler idToFollow={user._id} type="suggestion" />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
