import React, { useEffect, useState } from "react";
import './ListUsers.css'; // Создайте соответствующий файл стилей
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'; // Используйте подходящий иконки
import { Link } from "react-router-dom";

const ListUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  // Функция для получения списка пользователей
  const fetchUsers = async () => {
    await fetch('http://localhost:4000/user/userAll')
      .then((reps) => reps.json())
      .then((data) => {
        setAllUsers(data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Функция для удаления пользователя
  const removeUser = async (user_id) => {
    await fetch(`http://localhost:4000/user/delete/${user_id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id })
    });
    await fetchUsers();
  };

  return (
    <div className="list-product">
      <h1>Лист всех пользователей</h1>
      <div className="listproduct-format-main">
        <p>Имя пользователя</p>
        <p>Фамилия</p>
        <p>Email</p>
        <p>Удалить</p>
        <p>Редактировать</p>
      </div>
      <div className="listproduct-allusers">
        <hr />
        {allUsers.map((user) => (
          <React.Fragment key={user.user_id}>
            <div className="listproduct-format-main listproduct-format">
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
              <p>{user.email}</p>
              <img
                onClick={() => { removeUser(user.user_id); }}
                src={cross_icon} 
                className="listproduct-remove-icon" 
                alt="Удалить"
              />
              <Link to={`/update/${user.user_id}`} className="listproduct-edit-link">Редактировать</Link>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListUser;
