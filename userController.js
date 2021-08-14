let users = []

const getUser = (id) => {
    const user = users.find((u) => {
        if (u.id == id) {
            return true
        } else {
            return false
        }
    })
    if (!user) {
        return {
            error: "this person does not exist"
        }
    } else {
        return { user }
    }

}
const addUser = (q) => {
    const user = users.find((u) => {
        if (u.id == q.id) {
            return true
        } else {
            return false
        }
    })
    if (user) {
        return {
            user,
            error: "this person already exist"
        }
    } else {
        users.push(q)
        return { user: q }
    }
}


const removeUser = (id) => {
    const index = users.findIndex((u) => {
        if (u.id == id) {
            return true
        } else {
            return false
        }
    })
    return users.splice(index, 1)[0]
}

const getUsersRoom = ({room }) => {
    const userR = users.filter((user) => {
        if (room == user.room) {
            return true
        }
        else {
            return false
        }
    })

    return userR
}
module.exports = { getUsersRoom, getUser, addUser, removeUser }