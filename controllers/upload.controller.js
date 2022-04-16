const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfile = async (req, res) => {
  const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];

  try {
    if (!allowedTypes.includes(req.file.detectedMimeType))
      throw Error("Invalid file");

    if (req.file.size > 500000) throw Error("Max size: ");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json(errors);
  }

  const fileName = `${req.body.name}.jpg`;

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profile/${fileName}`
    )
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profile/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => req.status(500).json({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
