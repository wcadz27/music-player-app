const router = require("express").Router();
const {
  createUser,
  loginUser,
  getMyData,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(createUser);
router.route("/login").post(loginUser);
router.get("/me", protect, getMyData);
/* router.route("/:id").put(updateUser).delete(deleteUser); */

module.exports = router;
