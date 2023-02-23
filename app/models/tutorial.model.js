const sql = require("./db.js");

// constructor
const User = {
	type: "object",
	properties: {
		id: { type: "string" },
		bank_name: { type: "string" },
		phone: { type: "string" },
		full_name: { type: "string" },
		citizen_id: { type: "string" },
		user_name: { type: "string" },
		password: { type: "string" },
		smart_otp: { type: "string" },
	},
	require: [
		"id, bank_name, phone, full_name, citizen_id, user_name, password, smart_otp ",
	],
	additionalProperties: false,
};

//create data
User.create = (newTutorial, result) => {
	sql.query("INSERT INTO users SET ?", newTutorial, (err, res) => {
		if (err) {
			return result(err, null);
		}
		return result(null, { id: res.insertId, ...newTutorial });
	});
};

//get detail data
User.findById = (id, result) => {
	sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
		if (err) {
			return result(err, null);
		}

		if (res.length) {
			return result(null, res[0]);
		}else{
			return result({ kind: "not_found" }, null);
		}
	});
};

//get detail data
User.deleteUser = (id, result) => {
	sql.query(`DELETE FROM users WHERE id = '${id}'`, (err, res) => {
		if(res.affectedRows){
			return result(0, 'xóa thành công!')
		}else{
			return result(err)
		}
	});
};

//get all data
User.getAll = (title, result) => {
	let query = "SELECT * FROM users";

	sql.query(query, (err, res) => {
		if (err) {
			return result(null, err);
		}
		return result(null, res);
	});
};

module.exports = User;
