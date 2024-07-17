const http = require("http")
const fs = require("fs")
const myServer = http.createServer((req, res) => {
  const log = `\n${Date.now()}: New request: Recieved\n${req.url}`

  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page")
        break
      case "/about":
        res.end("About Page\n i am lavanya y m")
        break
      case "/contact":
        res.end("Contact Page")
        break
      default:
        res.end("Invalid URL")
    }
  })
})
myServer.listen(8000, () => console.log("server started"))
