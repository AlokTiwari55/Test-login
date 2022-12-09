const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.connect("mongodb+srv://alokt_55:alok75509@cluster0.cofyjtn.mongodb.net/myUserDB", {
    useNewUrlParser: true}, () => {
        console.log("DB Connected!") 
})

const adminSchema = new mongoose.Schema({
firstName: {
    type: String,
    required:[true, "First Name Required"]},
    lastName: {
        type: String,
        required:[true, "Last Name Required"]},
    email: String,
    password: String,
    number: String,
    dob: String,
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female'],
            message: '{VALUE} not supported'
        }
    }
})

const Admin = mongoose.model("Admin", adminSchema)

const admin6 = new Admin({
    firstName: "Shiva",
    lastName: "Andra",
    email: "Shiva",
    password: "abc",
    number: "5566",
    dob: "2000",
    gender: "Male"
});

//admin6.save();

app.post("/login", function(req, res) {

    const {email, password} = req.body;
    Admin.findOne({email: email}, (err, admin) =>{
        if(admin){
            if(email=== admin.email && password===admin.password){
                res.send({message: "Login Successfully", admin: admin})
            } else {
                res.send({message: "Incorrect Password!"})
            }
        } else {
            res.send({message: "User Not Registered!"})
        }
    });
        
})

app.post("/home", function(req, res){
    const {firstName, lastName, email, password, number, dob, gender} = req.body;
    Admin.findOne({email: email}, (err, admin) =>{
        if(admin){
            res.send({message: "User Already Exist"})
        } else {
            const admin = new Admin({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                number: number,
                dob: dob,
                gender: gender
            });
        
    

    admin.save(err => {
            if(err){
            res.send(err)
            } else {
                res.send({message: "Successfully entered data!"})
            }
        })
    }
    });
})

Admin.find(function(err, admins){
    if(err){
        console.log(err)
    } else{
        console.log(admin6.email);
    }
})

app.get("/", function(req, res) {
    Admin.find(function(err, admins){
        if(err){
            console.log(err);
        }else{
            console.log("Successfull");
            res.send(admin6.email);
            res.send(admin6.password);
        }
    })
})

app.listen(5000, () => {
    console.log("server connected at 5000");
})