const UserModel = require("../models/user.model");
const JWT = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors");

const maxAge = 4 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
   
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({
      pseudo: pseudo.trim(),
      email: email.trim(),
      password: password.trim(),
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.logout = async (_req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
