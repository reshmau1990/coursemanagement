const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster1.renrm.mongodb.net/COURSEMANAGEMENT?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    fname: String,
    quali: String,
    username : String,
    email : String,
    password : String,
});

var EmployerData = mongoose.model('employerdata', RegisterSchema);

module.exports = EmployerData;