import './Header.css'
import logo from '/cute-tanuki-pointer.png'
import backpack from '/backpack.png'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function Header() {

    const [menu, setMenu] = useState('shop')
    const [underlineStyle, setUnderlineStyle] = useState({});
    const menuRef = useRef([]);

    useEffect(() => {
        const activeIndex = ['shop', 'men', 'women', 'about'].indexOf(menu);
        const activeItem = menuRef.current[activeIndex];

        if (activeItem) {
            setUnderlineStyle({
                width: `${activeItem.offsetWidth}px`,
                left: `${activeItem.offsetLeft}px`,
            });
        }
    }, [menu]);
    
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
                <Link to='/'>
                <img id='image' src={logo} alt="" /></Link>
                <p>Tanuki</p>
            </div>
            <ul className="nav-menu">
                <li ref={(el) => menuRef.current[0] = el} className={menu === 'shop' ? 'active' : ''} onClick={()=>{setMenu('shop')}}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link></li>
                <li ref={(el) => menuRef.current[1] = el} className={menu === 'men' ? 'active' : ''} onClick={()=>{setMenu('men')}}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link></li>
                <li ref={(el) => menuRef.current[2] = el} className={menu === 'women' ? 'active' : ''} onClick={()=>{setMenu('women')}}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link></li>
                <li ref={(el) => menuRef.current[3] = el} className={menu === 'about' ? 'active' : ''} onClick={()=>{setMenu('about')}}><Link style={{ textDecoration: 'none' }} to='/about'>About</Link></li>
                <div className="underline" style={underlineStyle}></div>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'>
                    <img src={backpack} alt="" />
                </Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}