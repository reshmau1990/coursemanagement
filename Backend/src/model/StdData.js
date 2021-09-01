const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://userone:userone@cluster1.renrm.mongodb.net/COURSEMANAGEMENT?retryWrites=true&w=majority');


const Schema = mongoose.Schema;

const EnrolledSchema = new Schema({
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
         value:String,
         id:String
});

var StdData = mongoose.model('stddata', EnrolledSchema);

module.exports = StdData;