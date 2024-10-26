const db = require('../db')

class UserController {

    async createUser(req, res) {
        const {name, surname} = req.body
        const newPersone = await db.query(`insert into users (first_name, last_name) values ($1, $2) returning *`, [name, surname])
        res.json(newPersone)
    }

    async getUsers(req, res) {
        const users = await db.query(`select * from users`)
        res.json(users.rows)
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`select * from users where user_id = $1`, [id])
        res.json(user.rows)
    }

    async updateUser(req, res) {
        const {user_id, first_name} = req.body
        const user = await db.query(`update users set first_name = $1 where user_id = $2 returning *`, [first_name, user_id])
        res.json(user.rows)
    }

    async deleteUser(req, res) {
        
    }
}

module.exports = new UserController()