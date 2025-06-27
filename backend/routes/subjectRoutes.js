const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
} = require("../controllers/subjectController");

router.use(auth);

router.get("/", getSubjects);
router.post("/", createSubject);
router.delete("/:id", deleteSubject);
router.put("/:id", updateSubject);

module.exports = router;
