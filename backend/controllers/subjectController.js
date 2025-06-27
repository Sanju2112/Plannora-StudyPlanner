const Subject = require("../models/Subject");
const Topic = require("../models/Topic");

module.exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user }).lean();

    const subjectsWithTopics = await Promise.all(
      subjects.map(async (subject) => {
        const topics = await Topic.find({ subjectId: subject._id }).lean();
        return { ...subject, topics };
      })
    );
    res.json(subjectsWithTopics);
  } catch (error) {
    res.status(500).json({ message: "Failed to get subjects" });
  }
};

module.exports.createSubject = async (req, res) => {
  try {
    const newSubject = new Subject({
      userId: req.user,
      name: req.body.name,
    });
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create subject" });
  }
};

module.exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user,
    });
    if (!subject) {
      return res
        .status(404)
        .json({ message: "Subject not found or unauthorized" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subject" });
  }
};

module.exports.updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedSubject) {
      return res
        .status(404)
        .json({ message: "Subject not found or unauthorized" });
    }
    if (updatedSubject.userId.toString() !== req.user.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this subject" });
    }
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subject" });
  }
};
