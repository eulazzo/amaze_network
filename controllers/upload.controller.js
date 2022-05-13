const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors");

module.exports.uploadProfile = async (req, res) => {
  const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];
  const { imgType, size, userId, img: imgUrl } = req.body;

  try {
    if (!allowedTypes.includes(imgType)) throw Error("Only: .jpg, .png, .jpeg");

    if (size > 500000) throw Error("Max Size: 10px");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json(errors);
  }

  try {
    await UserModel.findByIdAndUpdate(
      userId,
      { $set: { picture: imgUrl } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => req.status(500).json({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
