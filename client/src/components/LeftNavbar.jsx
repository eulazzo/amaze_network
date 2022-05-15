import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LeftNavbar = () => {
  const [homeBorder, setHomeBorder] = useState("");
  const [rocketBorder, setRocketBorder] = useState("");
  const [userBorder, setUserBorder] = useState("");

  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <Link
            to={"/"}
            className={homeBorder}
            onMouseOver={() => setHomeBorder("active-left-nav")}
            onMouseLeave={() => setHomeBorder("")}
          >
            <img src="./img/icons/home.svg" alt="home icon" />
          </Link>
          <Link
            to={"/trending"}
            className={rocketBorder}
            onMouseOver={() => setRocketBorder("active-left-nav")}
            onMouseLeave={() => setRocketBorder("")}
          >
            <img src="./img/icons/rocket.svg" alt="rocket icon" />
          </Link>
          <Link
            to={"/profile"}
            className={userBorder}
            onMouseOver={() => setUserBorder("active-left-nav")}
            onMouseLeave={() => setUserBorder("")}
          >
            <img src="./img/icons/user.svg" alt="rocket icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};
