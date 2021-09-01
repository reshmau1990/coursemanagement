const express = require('express');
const port = process.env.PORT || 3000;
// var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
const EmployerData = require('./src/model/EmployerData');
const StudentRegisterData = require('./src/model/StudentRegisterData');
const StdData = require('./src/model/StdData');
const StudentData = require('./src/model/StudentData');
const cors = require('cors');
const bodyparser=require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { db } = require('./src/model/EmployerData');
var app = new express();
app.use(cors());
app.use(bodyparser.json());

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
 
});

var upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
}

app.post('/login', (req, res) => {
  let user = req.body;   

      EmployerData.findOne({email: user.email, password: user.password}, function(err, item){

        if(err){
             res.status(401).send('Invalid credentials');
        }
        if(item){

          let user = {
            email: req.body.email,
            password: req.body.password
          }

            let payload = {subject: user.email+user.password}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
            // console.log(item)
            // res.send(item);
        }
        else{
          res.status(401).send('Invalid');
        }

      })
})

app.post('/studentlogin', (req, res) => {
    let user = {
      email: req.body.email,
      password: req.body.password
    }

        StudentRegisterData.findOne({email: user.email, password: user.password}, function(err, item){
          if(err){
               res.status(401).send('Invalid credentials');
          }
          if(item){
            item = db.collection('studentregisterdatas').findOne({email:user.email})
            .then((item)=>{
              var userId=item._id
              res.status(200).json({
                userId:item._id
              })
            })
          }
          else{
            res.status(401).send('Invalid');
          }

        })      
})


app.post('/studentsignup/insert', (req,res)=>{
  
  var item = {
    fname: req.body.item.fname,
    email: req.body.item.email,
    password: req.body.item.password,
    cpassword: req.body.item.password
}

StudentRegisterData.findOne({email:item.email}, function(err,item){
if(item){
  res.status(401).send('User already exists');
}
else{
  var item = {
    fname: req.body.item.fname,
    email: req.body.item.email,
    password: req.body.item.password,
    cpassword: req.body.item.password
}
  var user = new StudentRegisterData(item);
  user.save();
  res.send(user);
}
})
})

app.post('/signup/insert', (req,res)=>{
  
  var item = {
    fname: req.body.item.fname,
    quali: req.body.item.quali,
    username: req.body.item.username,
    email: req.body.item.email,
    password: req.body.item.password,
    cpassword: req.body.item.cpassword
}

EmployerData.findOne({email:item.email}, function(err,item){
if(item){
  res.status(401).send('User already exists');
}
else{
  var item = {
    fname: req.body.item.fname,
    quali: req.body.item.quali,
    username: req.body.item.username,
    email: req.body.item.email,
    password: req.body.item.password,
    cpassword: req.body.item.cpassword
}
  var user = new EmployerData(item);
  user.save();
  res.send(user);
}
})
})

app.post('/stdform/insert', upload.single('image'), (req,res)=>{
  

   var item = {
    fname:req.body.item.fname,
    age:req.body.item.age,
    address:req.body.item.address,
    district:req.body.item.district,
    email:req.body.item.email,
    phno:req.body.item.phno,
    dob:req.body.item.dob,
    gender:req.body.item.gender,
    quali:req.body.item.quali,
    poy:req.body.item.poy,
    skill:req.body.item.skill,
    wstatus:req.body.item.wstatus,
    techtrain:req.body.item.techtrain,
    year:req.body.item.year,
    course:req.body.item.course
}
if(req.file){

  item.photo = req.file.originalname
}
else{
  item.photo = req.body.item.photo;
}

StudentRegisterData.findOne({email:item.email, fname: item.fname}, function(err,item){
  
  if(err){
    res.status(401).send('User email not matching');
    alert('User email not matching');
  }
  if(item){

        var item = {
          fname:req.body.item.fname,
          age:req.body.item.age,
          address:req.body.item.address,
          district:req.body.item.district,
          email:req.body.item.email,
          phno:req.body.item.phno,
          dob:req.body.item.dob,
          gender:req.body.item.gender,
          quali:req.body.item.quali,
          poy:req.body.item.poy,
          skill:req.body.item.skill,
          wstatus:req.body.item.wstatus,
          techtrain:req.body.item.techtrain,
          year:req.body.item.year,
          course:req.body.item.course

        }
        if(req.file){

          item.photo = req.file.originalname
        }
        else{
          item.photo = req.body.item.photo;
        }

        var user = new StdData(item);
        user.save();

  suser = db.collection('studentregisterdatas').findOne({email:item.email})
  .then((suser)=>{
    var Id = suser._id;
    console.log(Id);
    StdData.findOneAndUpdate({email:item.email},
      {$set:{"id":Id}})
      .then(()=>{
          res.send(user);
      })
  })
console.log(user);      
  }
})
})

app.get('/studenthome/stdhome/:id',  (req, res) => {
  userid = req.params.id;
  // console.log(userid);
    StdData.findOne({"id":userid})
    .then((student)=>{
      res.send(student);
    });
})

app.put('/studenthome/stdhome/editprofile', upload.single('image'),(req,res)=>{
  console.log(req.body)
  userid=req.body._id,
  console.log(req.body._id)
      fname=req.body.fname,
      age=req.body.age,
      address=req.body.address,
      district=req.body.district,
      email=req.body.email,
      phno=req.body.phno,
      dob=req.body.dob,
      gender=req.body.gender,
      quali=req.body.quali,
      poy=req.body.poy,
      skill=req.body.skill,
      wstatus=req.body.wstatus,
      techtrain=req.body.techtrain,
      year=req.body.year,
      course=req.body.course

      if(req.file){

        photo = req.file.originalname
      }
      else{
        photo = req.body.photo;
      }

  StudentData.findByIdAndUpdate({"_id":userid},
                              {$set:{"fname":fname,
                              "age":age,
                              "address":address,
                              "email":email,
                              "phno":phno,
                              "dob":dob,
                              "gender":gender,
                              "quali":quali,
                              "poy":poy,
                              "skill":skill,
                              "wstatus":wstatus,
                              "techtrain":techtrain,
                              "year":year,
                              "course":course,
                              "photo":photo}})
 .then(function(){
     res.send();
 })
})

app.get('/adminhome/dashboard/stdlist', function(req,res){
  StdData.find()
  .then(function(students){
    res.send(students);
  })
})

app.get('/adminhome/dashboard/stdreg', function(req,res){
  StudentRegisterData.find()
  .then(function(students){
    res.send(students);
  })
})

app.get('/adminhome/dashboard/stdlist/:id',  (req, res) => {
  
  const id = req.params.id;
    StdData.findOne({"_id":id})
    .then((student)=>{
        res.send(student);
    });
})

app.get('/adminhome/students',function(req,res){  
  StudentData.find()
              .then(function(students){
                  res.send(students);
              });
});

app.get('/adminhome/students/:id',  (req, res) => {
  
  id = req.params.id;
    StudentData.findOne({"_id":id})
    .then((student)=>{
      res.send(student);
    });
})


     
  app.listen(port, ()=>{
    console.log("Server is ready at "+port);
});

