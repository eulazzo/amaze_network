import axios from "axios";
import { useState } from "react";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const [terms, setTerms] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [termsError, setTermsError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== controlPassword || !terms) {
      if (password !== controlPassword)
        setPasswordConfirmError("Passwords do not match");

      if (terms) setTermsError("Accept the terms to proceed");
    } else {
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}api/user/register`, {
            pseudo,
            email,
            password,
          })
          .then((res) => {
            if (res.data.errors) {
              setPseudoError(res.data.errors.pseudo);
              setEmailError(res.data.errors.email);
              setPasswordError(res.data.errors.password);
            } else {
              setFormSubmit(true);
            }
          });
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4
            style={{ textAlign: "center", marginTop: "5px" }}
            className="success"
          >
            Account Created, please Login.
          </h4>
        </>
      ) : (
        <form onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Username</label>
          <br />
          <input
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            type="text"
            name="pseudo"
            id="pseudo"
          />
          <div className="pseudo error">{pseudoError}</div>
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            value={email}
          />
          <div className="error email">{emailError}</div>
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            value={password}
          />
          <div className="password error">{passwordError}</div>
          <br />

          <label htmlFor="password-confirm">Confirm Password</label>
          <br />
          <input
            onChange={(e) => setControlPassword(e.target.value)}
            type="password"
            name="password"
            value={controlPassword}
            id="password-confirm"
          />
          <div className="password-confim error">{passwordConfirmError}</div>
          <br />
          <input
            type="checkbox"
            name=""
            id="terms"
            onChange={(e) => setTerms(e.target.checked)}
          />
          <label htmlFor="terms">
            I accept the{" "}
            <a href="/terms" target={"_blank"} rel="noopener noreferrer">
              terms and conditions
            </a>
          </label>
          <div className="terms error">{termsError}</div>
          <input
            type="submit"
            style={{ color: "#000", fontWeight: "500" }}
            value={"Validate subscription"}
          />
        </form>
      )}
    </>
  );
};

export default SignUpForm;

// const terms = document.getElementById("terms");
// const pseudoError = document.querySelector(".pseudo.error");
// const emailError = document.querySelector(".email.error");
// const passwordError = document.querySelector(".password.error");
// const passwordConfirmError = document.querySelector(
//   ".password-confirm.error"
// );
// const termsError = document.querySelector(".terms.error");
