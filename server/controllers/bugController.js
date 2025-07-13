const Bug = require('../models/Bug');

// @desc    Get all bugs
exports.getBugs = async (req, res) => {
  const bugs = await Bug.find().sort({ createdAt: -1 });
  res.json(bugs);
};

// @desc    Create a new bug
exports.createBug = async (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Bug title is required');
  }

  const bug = await Bug.create({ title, description, status, priority });
  res.status(201).json(bug);
};

// @desc    Update a bug
exports.updateBug = async (req, res) => {
  const bug = await Bug.findById(req.params.id);

  if (!bug) {
    res.status(404);
    throw new Error('Bug not found');
  }

  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedBug);
};

// @desc    Delete a bug
exports.deleteBug = async (req, res) => {
  const bug = await Bug.findById(req.params.id);

  if (!bug) {
    res.status(404);
    throw new Error('Bug not found');
  }

  await bug.remove();
  res.json({ message: 'Bug removed' });
};
