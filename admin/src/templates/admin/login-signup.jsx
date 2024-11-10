import React, { useState } from "react";
import './login-signup.css'

const LoginSignUp = () => {

    const [state, setState] = useState("Login")
    const [formData, setFormData] = useState({
        username: "",
        password_hash: "",
        email: ""
    })

    const changeHandler = async (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const login = async () => {
        console.log("Login", formData)
        let responseData;
        await fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => responseData=data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.errors);
        }
    }

    const signUp = async () => {
        console.log("Sign Up", formData)
        let responseData;
        await fetch('http://localhost:4000/user/create', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => responseData=data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.errors);
        }
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="your email address"/>:<></>}
                    <input name='username' value={formData.username} onChange={changeHandler} type="username" placeholder="username"/>
                    <input name='password_hash' value={formData.password_hash} onChange={changeHandler} type="password" placeholder="password"/>
                </div>
                <div className="loginsignup-next">
                    <button onClick={() => {state === "Login" ? login() : signUp()}}>Продолжить</button>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp