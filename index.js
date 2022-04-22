const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('./user');
const Attendance = require('./attendance');
const Project = require('./project');
let user;
let present;

mongoose.connect('mongodb://localhost:27017/registrationUser', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        console.log("Connection to MONGO successful")
    })
    .catch(err => {
        console.log("error connecting to mongo")
    })

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views/public"));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/auth', (req, res) => {
    res.render('auth');
})

app.get('/login', async (req, res) => {
    res.render('auth');
})
app.get('/aboutus', (req, res) => {
    res.render('about_us')
})
app.get('/contactus', (req, res) => {
    res.render('contactus')
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { user })
})
app.get('/employee', (req, res) => {
    res.render('employee')
})
app.get('/clients', (req, res) => {
    res.render('clients')
})
app.get('/clientprofile', (req, res) => {
    res.render('clientprofile')
})
app.get('/leaves', (req, res) => {
    res.render('leaves')
})
app.get('/attendance', (req, res) => {
    res.render('attendanceAdmin')
})
app.get('/projects', (req, res) => {
    res.render('projects')
})
app.get('/employeeprofile', (req, res) => {
    res.render('employeeProfile')
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    user = await User.findOne({ email });
    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.redirect('/dashboard')
            
        } else {
            res.send("incorrect id or password")
        }
    }
    else {
        res.send("account is not present")
    }
})

app.post('/auth', async (req, res) => {
    const {password,name,email } = req.body;
    if (email != "" && password != "" && name != "") {
        present = await User.findOne({ email });
        if (!present) {
            const hash = await bcrypt.hash(password, 12);
            user = new User({
                name,
                email,
                password: hash
            })
            await user.save();
            res.redirect('/dashboard');
        } else {
            res.send("account already exists")
        }
    }
})
app.get('/att',async(req,res)=>{
    const attendance= new Attendance({
        name:'vd',
        att:['p','a','p','a','p','a','p','a']
    })
    await attendance.save();
    res.send('added')   
})
app.listen(3000, () => {
    console.log("Website running on port:3000")
})
