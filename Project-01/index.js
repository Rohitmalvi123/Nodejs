const express = require("express")
const fs = require("fs")
const mongoose = require("mongoose")
// const users = require("./MOCK_DATA.json");


const app = express();
const PORT = 8000;

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("MongoDB Connected")).catch((err) => console.log("Mongo Error", err))

// Schema
const userSchema = new mongoose.Schema({
	firstName:{
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	jobTitle: {
		type: String,
	},
	gender: {
		type: String,
	}
},{timestamps: true})

const User = mongoose.model("user", userSchema)

// Middleware - Plugin
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
	// console.log("Hello from middleware 1");
	// return res.json({ mgs: "Hello from middleware 1"})
	// return res.end("Hey")
	// req.myUserName = "RohitMalvi.dev"
	// next()
	fs.appendFile("log.txt", `\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`, (err, data)=>{
		next()
	})
})

// app.use((req, res, next) => {
// 	// console.log("Hello from middleware 2", req.myUserName);
// 	// return res.end("Hey")
// 	next()
// })

// Routes
app.get("/users", async (req, res) => {
	const allDbUsers = await User.find({})
	const html = `
	<ul>
	${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
	</ul>`;
	return res.send(html)
})

// REST API
app.get("/api/users", async(req, res) => {
	const allDbUsers = await User.find({})
	// console.log("I am in get route", req.myUserName);
	// res.setHeader("X-MyName", "RohitMalvi")// custom header
	// Always add X to custom headers
	return res.json(allDbUsers)
})

app.route("/api/users/:id").get(async(req, res) => {
    const user = await User.findById(req.params.id)
	// const id = Number(req.params.id);
	// const user = users.find((user) => user.id === id)
	if(!user) return res.status(404).json({error: "user not found"})
	return res.json(user)
}).patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
	// Edit user with id
	
	return res.json({status: "Success"})
})
.delete(async(req, res) => {
	// Delete user with id
	await User.findByIdAndDelete(req.params.id)
	return res.json({status: "Success"})
})

app.post("/api/users", async(req, res) => {
	// TOOD: Create new user
	const body = req.body;
	if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
		// return res.status(400).json({msg : "All fields are req..."})
	}

	const result = await User.create({
		firstName: body.first_name,
		lastName: body.last_name,
		email: body.email,
		gender: body.gender,
		jobTitle: body.job_title,

	})

	console.log("result", result);
	return res.status(201).json({msg: "success"})
	// users.push({...body, id: users.length+1})
	// fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err, data) => {
	//     return res.status(201).json({status: "success", id: users.length})
	// })
	// console.log("Body",body);
})

// app.patch("/api/users/:id", (req, res) => {
// 	// TOOD: Edit the user with id 
// 	return res.json({status: "pending"})
// })

// app.delete("/api/users/:id", (req, res) => {
// 	// TOOD: Delete the user with id
// 	return res.json({status: "pending"})
// })

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`))

