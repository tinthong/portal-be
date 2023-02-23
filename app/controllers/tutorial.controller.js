const User = require("../models/tutorial.model.js");
const moment = require('moment')

// Create and Save a new User
exports.create = (req, res) => {
	const data = req.body;
	// Validate request
	if (!data.id) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return
	}

	// Save User in the database
	User.create(data, (err, user) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while creating the User.",
			});
		else res.send(user);
	});
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
	const title = req.query.title;

	User.getAll(title, (err, data) => {
		if (err) {
			res.status(500).send({ message: err.message || "Some error occurred while retrieving user." })
		} else {
			for (let item of data) {
				item.created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')
				item.updated_at = moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss')
			}

			res.send(data)
		}
	});
};

// Find a single User by Id
exports.findOne = (req, res) => {
	User.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message: "Error retrieving User with id " + req.params.id,
				});
			}
		} else {
			data.created_at = moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')
			data.updated_at = moment(data.updated_at).format('YYYY-MM-DD HH:mm:ss')
			res.send(data);
		}
	});
};

// Find a single User by Id
exports.deleteUser = (req, res) => {
	User.deleteUser(req.params.id, (err, data) => {
		if(data){
			res.status(200).send({message: `Xóa thành công`,});
		}else{
			res.status(400).send({message: `Xóa thất bại`,});
		}
	});
};
