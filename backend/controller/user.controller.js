// controllers/UserController.js
const User = require('../models/user');

class UserController {
  async createUser(req, res) {
    try {
      const { username, password_hash, first_name, last_name } = req.body;
      // const newUser = await User.create({ first_name: first_name, last_name: last_name });
      const newUser = await User.create(req.body)
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  }

  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  }

  async updateUser(req, res) {
    try {
      const { user_id, first_name } = req.body;
      const [updated] = await User.update({ first_name }, { where: { user_id } });
      if (updated) {
        const updatedUser = await User.findByPk(user_id);
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const deleted = await User.destroy({ where: { user_id: id } });
      if (deleted) {
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}

module.exports = new UserController();
