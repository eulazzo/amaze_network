import { LeftNavbar } from "../components/LeftNavbar";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div className="home">
      <LeftNavbar />
      <div className="main">
        <Thread />
      </div>
    </div>
  );
};

export default Home;
