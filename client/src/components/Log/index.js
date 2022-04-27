import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = ({ signin, signup }) => {
  const [signUpModal, setSignUpModal] = useState(signup);
  const [signInModal, setSignInModal] = useState(signin);

  const handleModals = ({ target }) => {
    if (target.textContent.toLowerCase() === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            className={signUpModal ? "active-btn" : ""}
          >
            Register
          </li>
          <li
            onClick={handleModals}
            className={signInModal ? "active-btn" : ""}
          >
            Login
          </li>
        </ul>
        {signInModal && <SignInForm />}
        {signUpModal && <SignUpForm />}
      </div>
    </div>
  );
};

export default Log;
