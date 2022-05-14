const UserModel = require("../models/user.model");
const objectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (_req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(500).send(`ID unknown: ${req.params.id} `);

  await UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unkown" + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID invalid : " + req.params.id);

  const { newBio: bio } = req.body;

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(500).send(`ID unknown: ${req.params.id} `);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Succesfully deleted. " });
  } catch (error) {
    res.status(500).send({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !objectID.isValid(req.params.id) ||
    !objectID.isValid(req.body.idToFollow)
  )
    return res.status(500).send(`ID unknown: ${req.params.id} `);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).json(docs))
      .catch((err) => res.status(400).json(err));

    // add to the following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((err) => {
        if (err) return res.status(400).json(err);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    return res.status(500).send(`ID unknown: ${req.params.id} `);
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !objectID.isValid(req.params.id) ||
    !objectID.isValid(req.body.idToUnfollow)
  )
    return res.status(500).send(`ID unknown: ${req.params.id} `);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).json(docs))
      .catch((err) => res.status(400).json(err));

    // add to the following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((err) => {
        if (err) return res.status(400).json(err);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {}
};
