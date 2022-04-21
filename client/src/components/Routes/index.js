import { Routes, Route, useNavigate } from "react-router-dom";
import React from "react";
import Profile from "../../pages/Profile";
import Home from "../../pages/Home";
import Trending from "../../pages/Trending";

const Routers = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/trending" element={<Trending />} /> */}
    </Routes>
  );
};

export default Routers;
