const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost:27017/tejas',{ useNewUrlParser:true}, (err)=> {
    if(!err){console.log('Mongodb connection successfull..')}
    else{console.log('error in mongodb connection..'+err)}
});

require('./student.model');
