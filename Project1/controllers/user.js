
const User = require("../models/user")
async function handleGetAllUSer(req, res) {
  const allDbUsers = await User.find()
  return res.json(allDbUsers)
}
async function handleGetUserById(req, res) {
  const id = (req.params.id)
  const user = await User.findById(id)
  if (!user) return res.status(404).json({ error: "User not found" })
  return res.json(user)
}
async function handleUpdateUserById(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;

    // Validate input
    if (!body || !body.first_name || !body.email || !body.gender || !body.job_title) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Perform the update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
      },
      { new: true } // This option returns the updated document
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ status: "Success", user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteUserById(req, res) {
  const id = (req.params.id)
  await User.findByIdAndDelete(id)
  return res.json({status: 'success'})
}
async function handleCreateNewUser(req, res) {
  const body = req.body
  if (
    !body ||
    !body.first_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "Missing required fields." })
  }
  //console.log(body)
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  })
  console.log(result)
  return res.status(201).json({ msg: "Succes", id: result._id })
}
module.exports = {
  handleGetAllUSer,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
}
