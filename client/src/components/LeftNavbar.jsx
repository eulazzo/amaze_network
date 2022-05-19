import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const LeftNavbar = () => {

  const { pathname } = useLocation();

  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <Link to={"/"} className={pathname === "/" ? "active-left-nav" : ""}>
            <img src="./img/icons/home.svg" alt="home icon" />
          </Link>
          <Link
            to={"/trending"}
            className={pathname === "/trending" ? "active-left-nav" : ""}
          >
            <img src="./img/icons/rocket.svg" alt="rocket icon" />
          </Link>
          <Link
            to={"/profile"}
            className={pathname === "/profile" ? "active-left-nav" : ""}
          >
            <img src="./img/icons/user.svg" alt="rocket icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};
