import { Routes, Route } from "react-router-dom";

import Profile from "../../pages/Profile";
import Home from "../../pages/Home";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar";

const Routers = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </>
  );
};

export default Routers;
