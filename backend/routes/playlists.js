const router = require("express").Router();
const {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playlistController");

router.route("/").get(getPlaylists).post(createPlaylist);
router.route("/:id").put(updatePlaylist).delete(deletePlaylist);

module.exports = router;
