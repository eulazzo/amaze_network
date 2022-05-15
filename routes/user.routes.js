const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controllers");
const uploadController = require("../controllers/upload.controller");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// images [ Upload ]
router.post("/upload", uploadController.uploadProfile);

module.exports = router;
