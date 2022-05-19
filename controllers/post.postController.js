const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors");

const ObjectID = require("mongoose").Types.ObjectId;
module.exports.readPost = (_req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data: ", err);
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  if (req.body.imgURL) {
    const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];
    try {
      if (!allowedTypes.includes(req.body.imgType)) throw Error("invalid file");
      if (req.body.size > 5000000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.body.imgURL || "",
    video: req.body.video || "",
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

  try {
    const updatedPostMessage = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedPost },
      { new: true }
    );

    res.status(200).json(updatedPostMessage);
  } catch (error) {
    res.status(400).send({ message: error });
  }
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
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true }
    );

    const posts = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true }
    );
    res.status(200).json(posts);
  } catch (error) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  try {
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true }
    );

    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  try {
    return await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) res.status(404).json("Comment not found");
      theComment.text = req.body.text;

      return docs.save((_err) => {
        if (!err) return res.status(200).json(docs);
        return res.status(500).json(err);
      });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ "ID unknown: ": req.params.id });

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((docs) => res.status(200).json(docs))
      .catch((err) => res.status(400).send(err));
  } catch (error) {}
};
