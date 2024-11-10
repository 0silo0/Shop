import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditUsers.css';

const EditUser = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:4000/user/get/${user_id}`);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/user/update/${user_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    navigate('/users');
  };

  return (
    <div className="edit-user">
      <h1>Редактировать пользователя</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Имя пользователя:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <label>
          Имя:
          <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />
        </label>
        <label>
          Фамилия:
          <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditUser;
