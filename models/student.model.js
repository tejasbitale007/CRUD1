const { type } = require('express/lib/response');
const mongoose= require('mongoose');

var studentSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:'This field is required',
       
    },
    email:{
        type:String,
        required:'This field is required',
        
    },
    class:
    {
        type:String,
        required:'This field is required',
    },
    sub:{
        type:String,
        required:'This field is required',
    }
})
studentSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid email.');

mongoose.model('Student',studentSchema);