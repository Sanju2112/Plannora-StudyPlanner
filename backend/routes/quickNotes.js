const express = require("express");
const router = express.Router();
const quickNoteController = require("../controllers/quickNoteController");
const auth = require("../middlewares/authMiddleware");
const { getQuickNotes, createQuickNote, updateQuickNote, deleteQuickNote } =
  quickNoteController;

router.use(auth);

router.get("/", getQuickNotes);
router.post("/", createQuickNote);
router.put("/:id", updateQuickNote);
router.delete("/:id", deleteQuickNote);

module.exports = router;
