const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

const ObjectID = require("mongoose").Types.ObjectId;
module.exports.readPost = (_req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data: ", err);
  });
};
module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  const updatedPost = { message: req.body.message };

  await PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedPost },
    { new: true }
  )
    .then((docs) => res.status(200).json(docs))
    .catch((err) => res.status(400).send({ message: err }));
};
module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  await PostModel.findByIdAndRemove(req.params.id)
    .then((_docs) => res.status(200).json("Post deleted"))
    .catch((err) => console.log("Delete error: ", err));
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    return res.status(400).send(err);
  }
};
