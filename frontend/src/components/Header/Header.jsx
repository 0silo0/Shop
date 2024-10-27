import './Header.css'
import logo from '/cute-tanuki-pointer.png'
import backpack from '/backpack.png'
import { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContenxt'


export default function Header() {

    const [menu, setMenu] = useState('shop')
    const [underlineStyle, setUnderlineStyle] = useState({});
    const menuRef = useRef([]);
    
    const [timeNow, chekNowDate] = useState(new Date())
    const [showSeconds, setShowSeconds] = useState(false)
    
    useEffect(() => {
        const interval = setInterval(() => chekNowDate(new Date()), 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const {getTotalCartItems} = useContext(ShopContext);

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
                <Link to='/'>
                <img id='image' src={logo} alt="" /></Link>
                <p>Tanuki</p>
                <span onMouseEnter={() => setShowSeconds(true)} onMouseLeave={() => setShowSeconds(false)}>
                    {timeNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: showSeconds ? '2-digit' : undefined,})}
                    </span>
                <span>{timeNow.toLocaleDateString([], {weekday: 'short', day: 'numeric'})}</span>
            </div>
            <ul className="nav-menu">
                <li ref={(el) => menuRef.current[0] = el} className={menu === 'shop' ? 'active' : ''} onClick={()=>{setMenu('shop')}}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Главная</Link></li>
                <li ref={(el) => menuRef.current[1] = el} className={menu === 'men' ? 'active' : ''} onClick={()=>{setMenu('men')}}><Link style={{ textDecoration: 'none', color: 'black' }} to='/mens'>Мужчинам</Link></li>
                <li ref={(el) => menuRef.current[2] = el} className={menu === 'women' ? 'active' : ''} onClick={()=>{setMenu('women')}}><Link style={{ textDecoration: 'none', color: 'black' }} to='/womens'>Женщинам</Link></li>
                <li ref={(el) => menuRef.current[3] = el} className={menu === 'about' ? 'active' : ''} onClick={()=>{setMenu('about')}}><Link style={{ textDecoration: 'none', color: 'black' }} to='/about'>О нас</Link></li>
                <div className="underline" style={underlineStyle}></div>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/cart'>
                    <img src={backpack} alt="" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                {/* <Link to='/login'><button>Login</button></Link> */}
                <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
                <label htmlFor="burger-checkbox" className="burger"></label>
                <ul className="menu-list">
                    <li><Link to='/login'><button>Войти</button></Link></li>
                    <li><Link to='/out'><button>Выйти</button></Link></li>
                    <li><Link to='/pay'><button>Оформить заказ</button></Link></li>
                    <li><Link to='/pay'><button>Доставка и способ оплаты</button></Link></li>
                </ul>
            </div>
        </div>
    )
}