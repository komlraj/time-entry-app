const Task = require('../models/Task');

module.exports = {
	create: (req, res) => {
		const newTask = new Task(req.body);
		newTask.save((err, data) => {
      if(!err) {
				return res.status(200).json({
          "message" : "create task successfull"
        })
			} 
      else {
        return res.status(400)
      }
    })
	},

	tasks: (req, res) => {
		Task.find({}, (err, data) => {
			console.log(err, data, "tasks")
			res.status(200).json({data})
		})
	}

};
