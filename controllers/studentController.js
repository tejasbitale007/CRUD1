const express=require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose= require('mongoose');
const Student =mongoose.model('Student');

var router=express.Router();

router.get('/',(req,res)=>{
    res.render("student/addoredit",{
        viewTitle:"Insert Student",

    });
})
router.post('/',(req,res)=>{
    insertRecord(req,res);
})

function insertRecord(req,res){
    var student=new Student();
    student.fullname=req.body.fullname;
    student.email=req.body.email;
    student.class=req.body.class;
    student.sub=req.body.sub;
    student.save((err,doc)=>{
        if(!err)
        res.redirect('student/list')
        else{
            if(err.error=='ValidationEroor')
            {
                handleValidationError(err,req.body);
                res.render("student/addoredit",{
                    viewTitle:"Insert Student",
                    student:req.body

                });
            }
            else{
            console.log('Error during record insertion '+err)}
        }
    });
}
router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handleValidationError(err,body){
        for(field in err.errors){
            switch(err.errors[field].path){
                case 'fullname':
                    body['fullnameError']=err.errors[field].message;
                break;
                case 'email':
                    body['emailError']=err.errors[field].message;
                break;
                default:
                break;
            }
        }
}


module.exports=router;