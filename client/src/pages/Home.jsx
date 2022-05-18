import { useContext } from "react";
import { UserIdContext } from "../components/AppContext";
import { LeftNavbar } from "../components/LeftNavbar";
import NewPostForm from "../components/post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log/";
import Trends from "../components/Trends";

const Home = () => {
  const uid = useContext(UserIdContext);

  return (
    <div className="home">
      <LeftNavbar />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
