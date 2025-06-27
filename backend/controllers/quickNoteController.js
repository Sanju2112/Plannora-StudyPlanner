const QuickNote = require("../models/QuickNote");

module.exports.getQuickNotes = async (req, res) => {
  try {
    const notes = await QuickNote.find({ userId: req.user });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quick notes" });
  }
};

module.exports.createQuickNote = async (req, res) => {
  try {
    const newNote = new QuickNote({ userId: req.user, ...req.body });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating quick note" });
  }
};

module.exports.updateQuickNote = async (req, res) => {
  try {
    const updatedNote = await QuickNote.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    if (!updatedNote) {
      return res
        .status(404)
        .json({
          message:
            "Quick note not found or you do not have permission to update it",
        });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating quick note" });
  }
};

module.exports.deleteQuickNote = async (req, res) => {
  try {
    const deletedNote = await QuickNote.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user,
    });
    if (!deletedNote) {
      return res
        .status(404)
        .json({
          message:
            "Quick note not found or you do not have permission to delete it",
        });
    }
    res.status(200).json({ message: "Quick note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quick note" });
  }
};
