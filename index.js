const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const app = express()
const userController = require('./userController.js')
const publicdir = path.join(__dirname, "/public")
app.use(express.static(publicdir))
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {

    socket.on('input', (msg) => {

        let { user, error } = userController.getUser(socket.id)
        socket.emit("message", { message: msg, who: "me", time: new Date(), user: userController.getUser(socket.id) })
        socket.broadcast.to(user.room).emit("message", { message: msg, who: "otherio", time: new Date(), user: userController.getUser(socket.id) })
    })

    socket.on('join', ({ user, room }, cb) => {
        socket.join(room)
        let obj = userController.addUser({
            id: socket.id,
            user,
            room
        })
        if (obj.error) {
            cb(obj.error)
        }
        io.to(room).emit("updateUser", userController.getUsersRoom({ room }))
        socket.emit("message", { message: "Welcome", who: "chatio", time: new Date() });
        socket.broadcast.to(room).emit("message", { message: user + " has joined", who: "chatio", time: new Date() })
    })
    socket.on('disconnect', () => {

        let { user, error } = userController.getUser(socket.id)
        if (!error) {
            socket.broadcast.to(user.room).emit("message", { message: user.user + " has left", who: "chatio", time: new Date() })
            userController.removeUser(socket.id);
            io.to(user.room).emit("updateUser", userController.getUsersRoom({ room: user.room }))
        }
        else {
            console.log(error)
        }
    })

})

server.listen(9000, () => {
    console.log("Server is running")
})