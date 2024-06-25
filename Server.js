const http = require("http")
const app = require("./app")

const port = process.env.PORT || 6061
const server = http.createServer(app)

app.listen(port)

module.exports = server;