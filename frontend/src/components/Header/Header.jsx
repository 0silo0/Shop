import './Header.css'
import logo from '/cute-tanuki-pointer.png'
import backpack from '/backpack.png'


export default function Header() {

    
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img id='image' src={logo} alt="" />
                <p>Tanuki</p>
            </div>
            <ul className="nav-menu">
                <li>Shop <hr /></li>
                <li>Men</li>
                <li>Women</li>
            </ul>
            <div className='nav-login-cart'>
                <button>Login</button>
                <img src={backpack} alt="" />
            </div>
        </div>
    )
}