const users = require("../models/user")
async function handleGetAllUSer(req, res) {
  const allDbUsers = await users.find()
  return res.json(allDbUsers)
}
async function handleGetUserById(req, res) {
  const id = Number(req.params.id)
  const user = users.findById(id)
  if (!user) return res.status(404).json({ error: "User not found" })
  return res.json(user)
}
async function handleUpdateUserById(req, res) {
  {
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
  }
}
async function handleDeleteUserById(req, res) {
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
}
async function createNewUser(req, res) {
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
}
module.exports = {
  handleGetAllUSer,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  createNewUser,
}
