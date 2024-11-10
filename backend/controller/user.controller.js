// controllers/UserController.js
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const jwtSecret = 'jwtsecret';

class UserController {
  async createUser(req, res) {
    try {
      const { username, password_hash, first_name, last_name } = req.body;
      // const newUser = await User.create({ first_name: first_name, last_name: last_name });
      if (await User.findOne({ where: { email: req.body.email } })) {
        return res.status(400).json({success: false, errors: 'На эту почту уже зарегистрирован аккаунт'})
      }
      const newUser = await User.create(req.body);

      const token = jwt.sign(
        { userId: newUser.user_id, email: newUser.email },
        jwtSecret,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        user: newUser,
        token
      });
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

  async Login(req, res) {
    try {
      const user = await User.findOne({where: {username: req.body.username}})
      if (user) {
        if (req.body.password_hash === user.password_hash) {
          const token = jwt.sign(
            { user_id: user.user_id, username: user.username },
            jwtSecret,
            { expiresIn: '1h' } // Токен действует 1 час
          );
          return res.json({ success: true, token });
        } else {
          return res.status(401).json({ success: false, message: 'Неверный пароль' });
        }
      } else {
        return res.status(404).json({ success: false, message: 'Пользователь не найден' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Ошибка при входе', error });
    }
  }

  async getOneUser(req, res) {
    try {
      const id = req.params.user_id;
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
      const { user_id, username, first_name, last_name, email } = req.body;
      
      const [updated] = await User.update({ username, first_name, last_name, email }, { where: { user_id } });
      if (updated) {
        const updatedUser = await User.findByPk(user_id);
        res.json(updatedUser); // Отправляем обновленные данные
      } else {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении пользователя', error });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.user_id;
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
