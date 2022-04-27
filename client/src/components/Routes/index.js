import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Profile from "../../pages/Profile";
import Home from "../../pages/Home";
import Trending from "../../pages/Trending";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </Router>
  );
};

export default Routers;
