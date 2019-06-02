const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task : String,
    project: String,
    startTime: String,
    endTime: String,
    timer: Boolean,
    date: Date
  });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
