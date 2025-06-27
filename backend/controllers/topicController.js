const Topic = require("../models/Topic");
const Subject = require("../models/Subject");

module.exports.getTopics = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    if (subject.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const topics = await Topic.find({ subjectId: req.params.subjectId });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch topics" });
  }
};

module.exports.createTopic = async (req, res) => {
  try {
    const { subjectId, title, dueDate, notes } = req.body;
    const subject = await Subject.findById(subjectId);
    if (!subject || subject.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const topic = new Topic({
      subjectId,
      title,
      dueDate,
      notes,
    });
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: "Failed to create topic" });
  }
};

module.exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    const subject = await Subject.findById(topic.subjectId);
    if (!subject || subject.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const updateTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateTopic);
  } catch (error) {
    res.status(500).json({ message: "Failed to update topic" });
  }
};

module.exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    const subject = await Subject.findById(topic.subjectId);
    if (!subject || subject.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    await Topic.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete topic" });
  }
};

module.exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({}).populate({
      path: "subjectId",
      select: "name userId",
    });
    const filtered = topics.filter(
      (topic) =>
        topic.subjectId &&
        topic.subjectId.userId.toString() === req.user.toString()
    );
    const formatted = filtered.map((topic) => ({
      ...topic.toObject(),
      subjectName: topic.subjectId.name,
    }));
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch topics" });
  }
};
