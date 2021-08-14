const socket = io()
const btn = document.getElementById('btn')
const inp = document.getElementById('inp')
const chat = document.getElementById('chat')
btn.addEventListener('click', () => {

    socket.emit("input", inp.value)

})
socket.on('message', ({ message, who,time,user }) => {
    const clear = document.createElement('div')
    const au = document.createElement('div')
    clear.className = 'clear'
    au.className = "author"
    const hour = (new Date(time)).getHours()
    const minut =  (new Date(time)).getMinutes()
    if(who=="otherio"){
        au.innerHTML = "<div class='au'>"+user.user.user +" </div><div class='time'>" +hour+":"+minut+"</div>"
    }
    else{
        au.innerHTML = "<div class='time'>" +hour+":"+minut+"</div>"
    }
    const msg = document.createElement('div')
    msg.className = "msg " + who
    msg.innerHTML = message
    msg.append(au)
    chat.append(clear)
    chat.append(msg)
    chat.append(clear)
    chat.scrollTop = chat.scrollHeight
})

socket.on("updateUser", (users) => {
    const html = users.reduce((str, user) => {
        const s = "<div class='USER'>" + user.user + "</div>"
        return str + s
    }, "")

    document.getElementById('others').innerHTML = html
})



let str = location.search
let user = str.match(/name=(.*)&/)[1]
let room = str.match(/room=(.*)/)[1]
document.getElementById('userName').innerHTML = user
socket.emit('join', { user, room }, (error) => {
    location.href = '/'
})


