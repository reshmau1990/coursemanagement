const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://userone:userone@cluster1.renrm.mongodb.net/COURSEMANAGEMENT?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const ApprovedSchema = new Schema({
         value:String,
         fname: String,
         age:String,
         address:String,
         district:String,
         email:String,
         phno:String,
         dob:String,
         gender:String,
         quali:String,
         poy:String,
         skill:String,
         wstatus:String,
         techtrain:String,
         year:String,
         course:String,
         photo:String,
         id:String
});

var StudentData = mongoose.model('studentdata', ApprovedSchema);

module.exports = StudentData;