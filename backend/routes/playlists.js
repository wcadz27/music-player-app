const router = require("express").Router();
const {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playlistController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPlaylists).post(protect, createPlaylist);
router
  .route("/:id")
  .put(protect, updatePlaylist)
  .delete(protect, deletePlaylist);

module.exports = router;
