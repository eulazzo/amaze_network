module.exports.signUpErrors = (err) => {
  const errors = { pseudo: "", email: "", password: "" };

  const checkErrorType = (errorkey) => err.message.includes(errorkey);

  if (checkErrorType("pseudo")) errors.pseudo = "Incorrect Pseudo";
  if (checkErrorType("email")) errors.email = "Email incorrect";
  if (checkErrorType("password"))
    errors.password = "Password should have at least 6 caracteres!";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Username already registered";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email already registered";

  return errors;
};

module.exports.signInErrors = (err) => {
  const errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email not found";

  if (err.message.includes("password"))
    errors.password = "Password does not match";

  return errors;
};

module.exports.uploadErrors = (err) => {
  const errors = { format: "", maxSize: "" };
  if (err.message.includes("Invalid file"))
    errors.format = "Format imcompatible";
  if (err.message.includes("Max size"))
    errors.maxSize = "The file exceeds 500kb";
  return errors;
};
