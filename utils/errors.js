module.exports.signUpErrors = (err) => {
  const errors = { pseudo: "", email: "", password: "" };

  const checkErrorType = (errorkey) => err.message.includes(errorkey);

  if (checkErrorType("pseudo")) errors.pseudo = "Incorrect Pseudo";
  if (checkErrorType("email")) errors.email = "Email incorrect";
  if (checkErrorType("password"))
    errors.password = "password should have at least 6 caracteres!";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "pseudo already registered";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email already registered";

  return errors;
};

module.exports.signInErrors = (err) => {
  const errors = { email: "", password: "" };

  //Not a good idea to inform which one is wrong,
  // password or email for security reasons
  
  if (err.message.includes("email"))
    errors.email = "Email and  password doesn't match!";
  if (err.message.includes("password"))
    errors.password = "Email and  password doesn't match!";

  return errors;
};
