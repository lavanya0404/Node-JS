const express = require("express")
const {
  handleGetAllUSer,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  createNewUser,
} = require("../controllers/user")
const router = express.Router()

router.route("/")
.get(handleGetAllUSer)
.post(createNewUser)

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById)

module.exports = router
