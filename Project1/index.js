const express = require("express")
const { connectMongoDb } = require("./connection")
const { logReqRes } = require("./middlewares")
const useRouter = require("./routes/user")

const app = express()
const PORT = 8000

connectMongoDb("mongodb://127.0.0.1:27017/project1").then(() =>
  console.log("Moongose started")
)
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"))

app.use("/api/users", useRouter)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
