import React from "react";
import '../css/login-signup.css'

const LoginSignUp = () => {
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="your name"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                </div>
                <div className="loginsignup-next">
                    <button>Продолжить</button>
                </div>
                <p className="loginsignup-login">Уже есть аккаунт? <span>Войти здесь</span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>Я соглашаюсь с политикой пользователя</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp