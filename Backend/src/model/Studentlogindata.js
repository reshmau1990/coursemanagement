const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster1.renrm.mongodb.net/COURSEMANAGEMENT?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    email : String,
    password : String
});

var Studentlogindata = mongoose.model('logindata', LoginSchema);

module.exports = Studentlogindata;