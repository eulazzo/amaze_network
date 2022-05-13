import { useContext } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { UserIdContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const userID = useContext(UserIdContext);
  const userData = useSelector((state) => state.user.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="Logo Amaze Network" />
              <h3>Amaze</h3>
            </div>
          </Link>
        </div>

        <div>
          {userID ? (
            <ul>
              <li></li>
              <li className="welcome ">
                <Link to="/profile " style={{ display: "flex" }}>
                  <h5 className="btnWelcome">Welcome</h5>
                  <h5>{`${userData.pseudo}`}</h5>
                </Link>
              </li>
              <Logout />
            </ul>
          ) : (
            <ul>
              <li></li>
              <li>
                <Link to="/profile">
                  <img src="./img/icons/login.svg" alt="login" />
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
