const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const user = new Schema({
    email: { type: String, unique: true },
    password: String,
    username: String
});

const userTodo = new Schema({
    userId: objectId,
    task: String,
    status: Boolean
});

const userModel = mongoose.model('user', user);
const userTodoModel = mongoose.model('userTodo', userTodo);

module.exports = {
    userModel,
    userTodoModel
}