const http = require("http")
const fs = require("fs")
const url = require("url")
const myServer = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") return res.end()
  const log = `${Date.now()}: New request Recieved\n requested URL:${
    req.url
  }\n Requested method : ${req.method}\n`
  const myURL = url.parse(req.url, true)
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myURL.pathname) {
      case "/":
        res.end("Home Page")
        break
      case "/about":
        const userName = myURL.query.myName
        res.end(`Hi,${userName}`)
        break
      case "/contact":
        res.end("Contact Page")
        break
      case "/search":
        const search_query = myURL.query.search_query
        res.end(`Search Results for: ${search_query}`)
        break
      case '/signup':
        if(req.method =="GET"){
          res.end("This is sign up form")
        }
        else if(req.method==='POST'){
          res.end("Successfully registered")
        }
        break
      case "/error":
      default:
        res.end("Invalid URL")
    }
  })
})
myServer.listen(8000, () => console.log("server started"))
