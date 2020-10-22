const express = require("express")
const bodyParser = require("body-parser")
const handlerBars = require("express-handlebars")
const port = 3000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server)
const path = require("path")

app.engine("handlebars", handlerBars());
app.set("view engine", "handlebars");
app.use(express.static('public'))
console.log(path.join(__dirname, 'public'))

app.get("/", (req, res) => {
    res.render("login")
})

app.post("/", (req, res) => {
    console.log("post req received")
    res.render("chatroom")
})

io.of('/lobby').on("connection", (socket) => {
    console.log("a user is connected to the socket")
    socket.on("chat message", (message) => {
        console.log(message)
        // io.emit emitts to all sockets, socket.emit emits to 1 socket only
        io.of('/lobby').emit("chat message", message)
    })
})

// app.listen(port, () => {
//     console.log(`app listening to port: ${port}`)
// })

server.listen(port)