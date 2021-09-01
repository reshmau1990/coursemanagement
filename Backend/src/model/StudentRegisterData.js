const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster1.renrm.mongodb.net/COURSEMANAGEMENT?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    fname : String,
    email : String,
    password : String,
});

var StudentRegisterData = mongoose.model('studentregisterdata', RegisterSchema);

module.exports = StudentRegisterData;