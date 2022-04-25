const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./user");
const Project = require("./project");
const Employee = require("./employee");
const Client = require("./client");
const Reqleave = require('./reqleave');
const leavetypes = ['Casual Leave 12 Days', 'Medical Leave', 'Loss of Pay']

let user;
let present;
let projects;
let emp;
let client;
let empren;
let id;


mongoose.connect("mongodb://localhost:27017/registrationUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MONGO successful");
  })
  .catch((err) => {
    console.log("error connecting to mongo");
  });

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views/public"));

app.listen(3000, () => {
  console.log("Website running on port:3000");
});


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/auth", (req, res) => {
  res.render("auth");
});

app.get("/login", async (req, res) => {
  res.render("auth");
});
app.get("/aboutus", (req, res) => {
  res.render("about_us");
});
app.get("/contactus", (req, res) => {
  res.render("contactus");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { user });
});
app.get("/employee", async (req, res) => {
  empren = await Employee.find();
  res.render("employee", { empren });
});
app.get("/clients", async (req, res) => {
  clientren = await Client.find();
  res.render("clients",{clientren});
});
app.get("/clientprofile", (req, res) => {
  res.render("clientprofile");
});

app.get("/attendance", (req, res) => {
  res.render("attendanceAdmin");
});
app.get("/projects", async (req, res) => {
  projects = await Project.find().sort({priority:-1});
  res.render("projects", { projects });
});
app.get("/employeeprofile", (req, res) => {
  res.render("employeeProfile");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  user = await User.findOne({ email });
  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.redirect("/dashboard");
    } else {
      res.send("incorrect id or password");
    }
  } else {
    res.send("account is not present");
  }
});

app.post("/auth", async (req, res) => {
  const { password, name, email } = req.body;
  if (email != "" && password != "" && name != "") {
    present = await User.findOne({ email });
    if (!present) {
      const hash = await bcrypt.hash(password, 12);
      user = new User({
        name,
        email,
        password: hash,
      });
      await user.save();
      res.redirect("/dashboard");
    } else {
      res.send("account already exists");
    }
  }
});

app.post("/employee", async (req, res) => {
  const {
    fname,
    lname,
    uname,
    email,
    pwd,
    _id,
    jdate,
    phone,
    company,
    designation,
    department,
  } = req.body;
  present = await Employee.findOne({ email });
  if (!present) {
    emp = new Employee({
      fname,
      lname,
      uname,
      email,
      pwd: "weboffice123",
      _id,
      jdate,
      phone,
      company,
      designation,
      department,
    });
    await emp.save();
    res.redirect("/employee");
  } else {
    res.redirect("/employee");
  }
});

app.post('/clients',async (req, res) => {
  const {fname,lname,uname,email,_id,phone,company} = req.body;
  present = await Client.findOne({ email });
  if (!present) {
    client = new Client({
      fname,
      lname,
      uname,
      email,
      _id,
      phone,
      company
    });
    await client.save();
    res.redirect("/clients");
  } else {
    res.redirect("/clients");
  }
})


app.get("/edit/:_id", (req, res) => {
  id = req.params._id.slice(1);
  Employee.findById({ _id: id }, (err, e) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit_employee", { e });
    }
  });
});

let deleteid;
app.get("/deleteemployee/:_id", (req, res) => {
  id = req.params._id.slice(1);
  Employee.findById({ _id: id }, (err, e) => {
    if (err) {
      console.log(err);
    } else {
      deleteid = id;
      res.render("delete");
    }
  });
});
app.post("/deleteemployee", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(
    { _id: deleteid },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/employee");
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});


app.post("/edit/:_id", async (req, res) => {
  const id = req.body._id;
  const updateemp = await Employee.findByIdAndUpdate(
    { _id: id },
    {
      fname: req.body.fname,
      lname: req.body.lname,
      uname: req.body.uname,
      email: req.body.email,
      jdate: req.body.jdate,
      phone: req.body.phone,
      company: req.body.company,
      department: req.body.department,
      designation: req.body.designation,
    }
  );
  await updateemp.save();
  res.redirect("/employee");
});
app.get("/editclient/:_id", (req, res) => {
  id = req.params._id.slice(1);
  Client.findById({ _id: id }, (err, c) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit_client", { c });
    }
  });
});
app.post("/editclient/:_id", async (req, res) => {
  const id = req.body._id;
  const updateclient = await Client.findByIdAndUpdate(
    { _id: id },
    {
      fname: req.body.fname,
      lname: req.body.lname,
      uname: req.body.uname,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
    }
  );
  await updateclient.save();
  res.redirect("/clients");
});


app.get("/deleteclient/:_id", (req, res) => {
  id = req.params._id.slice(1);
  Client.findById({ _id: id }, (err, e) => {
    if (err) {
      console.log(err);
    } else {
      deleteid = id;
      res.render("deleteclient");
    }
  });
});
app.post("/deleteclient", async (req, res) => {
  const clone = await Client.findByIdAndDelete(
    { _id: deleteid },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/clients");
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});


// nitya leaves



app.get('/leaves', async (req, res) => {
  const reqleaves = await Reqleave.find();
  res.render('leaves', { reqleaves })
})

app.post('/leaves', async(req, res) => {
  const newLeave = new Reqleave(req.body)
  await newLeave.save();
  res.redirect(`/leaves/${newLeave._id}`)
})
app.get('/leaves/:id', async (req, res) => {
  const { id } = req.params;
  const reqleave = await Reqleave.findById(id)
  res.redirect('/leaves');
})

app.get('/leaves/:id/edit', async (req, res) => {
  const { id } = req.params;
  const reqleave = await Reqleave.findById(id);
  res.render('edit', { reqleave, leavetypes })
})

app.post('/leaves/:id', async(req, res) => {
  const { id } = req.params;
  const reqleave = await Reqleave.findByIdAndUpdate(id, req.body, {runValidators: true});
  res.redirect(`/leaves/${reqleave._id}`)
})

app.get("/deleteleaves/:_id", (req, res) => {
  id = req.params._id.slice(1);
  Reqleave.findById({ _id: id }, (err, e) => {
    if (err) {
      console.log(err);
    } else {
      deleteid = id;
      res.render("deleteleaves");
    }
  });
});
app.post("/deleteleaves", async (req, res) => {
  const clone = await Reqleave.findByIdAndDelete(
    { _id: deleteid },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/leaves");
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});




//sk projects




app.get('/deleteproject/:pid', (req, res) => {
  id = req.params.pid.slice(1);
  Project.findById({ _id: id }, (err, e) => {
    if (err) {
      console.log(err);
    } else {
      deleteid = id;
      res.render("deleteproject");
    }
  });
})
app.post("/deleteproject", async (req, res) => {
  const clone = await Project.findByIdAndDelete(
    { _id: deleteid },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/projects");
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

app.get('/editproject/:pid', (req, res) => {
  let str = req.params.pid;
  str = str.slice(1);
  console.log(str);
  Project.findById(str, function (err, project) {
      if (err){
          console.log(err);
      }
      else{
          res.render("edit_project", {project})
      }
  });
})
app.post("/editproject/:pid", async (req, res) => {
  const id = req.params.pid.slice(1);
  const updateproject = await Project.findByIdAndUpdate(
    { _id: id },
    {
      projectName : req.body.projectName,
      clientName: req.body.clientName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      budget: req.body.budget,
      priority: req.body.priority,
      projectLeader: req.body.projectLeader,
      team: req.body.team,
      pdescription: req.body.pdescription
    }
  );
  await updateproject.save();
  res.redirect("/projects");
});

app.get('/project-view/:pid', (req, res) => {
  let str = req.params.pid;
  let id = str.slice(1);
  Project.findById(id, function (err, project) {
      if (err){
          console.log(err);
      }
      else{
          console.log("Result : ", project);
          res.render('project-view', {project});
      }
  });
  
})

app.post('/projects', async (req, res) => {

  let {projectName,clientName,startDate,endDate,budget,priority,projectLeader,team,pdescription} = req.body;
  team = req.body.team.split(",");
  projects = new Project({
      projectName,clientName,startDate,endDate,budget,priority,projectLeader,team,pdescription
  });
  await projects.save();
  res.redirect('/projects');
  
})


app.post('/markdone',async (req, res) => {
  let id = req.body.pid;
  const updateproject = await Project.findByIdAndUpdate(
    { _id: id },
    {
      progress:"Completed"
    }
  );
  await updateproject.save();
  res.redirect("/projects");
})
