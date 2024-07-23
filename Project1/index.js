const express = require("express")
const fs = require("fs")
const mongoose = require("mongoose")
const app = express()
const PORT = 8000
mongoose
  .connect("mongodb://127.0.0.1:27017/project1")
  .then(() => console.log("Mongoose connect success"))
  .catch((err) => console.log("Moongose error", err))
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid email address",
      },
    },
    gender: {
      type: String,
      required: true,
      //enum: ["Male", "Female", "Other"],
    },
    job_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
const User = mongoose.model("user", userSchema)
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method} ${req.path}`,
    (err, data) => {
      next()
    }
  )
})
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({})
  const html = `<ul>
  ${allDbUsers
    .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
    .join(" ")}
  </ul>`
  res.send(html)
})

app.get("/api/users", (req, res) => {
  return res.json(users)
})

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id == id)
    if (!user) return res.status(404).json({ error: "User not found" })
    return res.json(user)
  })
  .patch((req, res) => {
    const id = Number(req.params.id)
    const updateUser = req.body

    users.forEach((user, index) => {
      if (user.id === id) {
        users[index] = { ...user, ...updateUser }
      }
    })

    fs.writeFile("./mockData.json", JSON.stringify(users), (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: "Failed to update user." })
      }
      return res.json({
        status: "Success",
        updatedUser: users.find((user) => user.id === id),
      })
    })
  })
  .delete((req, res) => {
    const id = Number(req.params.id)

    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
      users.splice(index, 1)
    }

    fs.writeFile("./mockData.json", JSON.stringify(users), (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: "Failed to delete user." })
      }
      return res.json({ status: "Success", deletedUserId: id })
    })
  })
  .put((req, res) => {
    return res.json({ statusbar: "Pending" })
  })

app.post("/api/users", async (req, res) => {
  const body = req.body
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "Missing required fields." })
  }
  // console.log(body)
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  })
  console.log(result)
  return res.status(201).json({ statusbar: "Succes", id: result._id })
})

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const user = users.find((user) => user.id == id)
//   return res.json(user)
// })

// app.patch("api/users/:id", (req, res) => {
//   return console.log("status: Pending" )
// })
// app.delete("api/users/:id", (req, res) => {
//   return console.log("status: Pending" )
// })
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
