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
    .then((docs) => res.status(200).json("Post deleted"))
    .catch((err) => console.log("Delete error: ", err));
};
