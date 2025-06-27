const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  dueDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
