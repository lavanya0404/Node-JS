const express = require("express")
const users = require("./mockData.json")
const fs = require("fs")
const app = express()
const PORT = 8000
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method} ${req.path}`,
    (err, data) => {
      next();
    }
  )
})
app.get("/users", (req, res) => {
  const html = `<ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
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

app.post("/api/users", (req, res) => {
  const body = req.body
  // console.log(body)
  users.push({ ...body, id: users.length + 1 })
  fs.writeFile("./mockData.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ statusbar: "Succes", id: users.length })
  })
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
