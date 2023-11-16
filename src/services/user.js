const { models } = require('../db/sequelize')

async function login(username, password) {
    try {
        const user = await models.Users.findOne({
            where: {
                username,
                password
            }
        });
        if (!user) {
            throw new Error('Wrong username or password')
        }
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getUsers() {
    const users = await models.Users.findAll();
    return users
}

async function getUser(userId) {
    const user = await models.Users.findByPk(userId)
    return user
}

async function saveNewUser(username, password) {
    const userCreated = await models.Users.create({
        username: username,
        password: password,
    })
    console.log(userCreated)
}

async function updateUser(userId, username, password) {
    const user = await models.Users.findByPk(userId)
    if (!user) {
        throw new Error("User not found")
    }
    await user.update({
        username,
        password,
    })
}

async function deleteUser(userId) {
    const userToDelete = await models.Users.findByPk(userId)
    userToDelete.destroy()
}

module.exports = {
    login,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    saveNewUser
}