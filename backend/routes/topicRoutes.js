const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
  getAllTopics,
} = require("../controllers/topicController");

router.use(auth);

router.get("/subject/:subjectId", getTopics);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);
router.get("/all", getAllTopics);

module.exports = router;
