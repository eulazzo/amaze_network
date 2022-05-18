import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UserIdContext } from "../components/AppContext";
import { LeftNavbar } from "../components/LeftNavbar";
import { isEmpty } from "../components/Utils";
import Card from "../components/post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profile/FriendsHint";

const Trending = () => {
  const uid = useContext(UserIdContext);
  const trendList = useSelector((state) => state.user.trendingReducer);

  return (
    <div className="trending-page">
      <LeftNavbar />
  
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  );
};

export default Trending;
