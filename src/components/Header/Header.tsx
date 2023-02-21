import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './Header.scss';

import PhoneMenu from './PhoneMenu';
import Logo  from '../../assets/icons/Logo.svg';
import Heart  from '../../assets/icons/Heart.svg';
import Cart  from '../../assets/icons/Cart.svg';
import Menu  from '../../assets/icons/Menu.svg';
import Close  from '../../assets/icons/Close.svg';

const Header = ({screenSize} : {screenSize: number}) => {

  const [phoneMenu, setPhoneMenu] = useState(false);

  const onToggleMenu = () => {
    setPhoneMenu(!phoneMenu);
  };

  useEffect(() => {
    if (screenSize <= 640) {
      phoneMenu && setPhoneMenu(true);
    } else {
      setPhoneMenu(false);
    }
  }, [screenSize]);

  const onPhoneNavigate = () => {
    setPhoneMenu(false);
  };
  
  return (
    <>
      <nav className="header">

        <Link to="/" className="header-logoBox" onClick={()=> setPhoneMenu(false)}>
          <div className="header-logoBox-logo">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        <div className="header-menuItems">
          <NavLink to='/' className="header-menuItems-item">Home</NavLink>
       
          <NavLink to='/phones' className="header-menuItems-item">Phones</NavLink>
        
          <NavLink to='/tablets' className="header-menuItems-item">Tablets</NavLink>
        
          <NavLink to='/accessories' className="header-menuItems-item">Accessories</NavLink>
        </div>

        <div className="header-buttonsRight">
          <NavLink to='/favorites' className="header-buttonsRight-item">
            <div>
              <img src={Heart} alt="heart icon" className="heartIcon" />
            </div>
          </NavLink>

          <NavLink to='/cart' className="header-buttonsRight-item" >
            <div >
              <img src={Cart} alt="heart icon" />
            </div>
          </NavLink>

          <button 
            type='button' 
            className="header-buttonsRight-item header-buttonsRight-phone"
            onClick={onToggleMenu}
          >
            <img 
              src={phoneMenu ? Close : Menu} 
              alt="menu icon" 
              className={`${phoneMenu ? 'activeMenu' : 'normalMenu'}`}
            />
          </button>
        </div>

      </nav>
      
      {phoneMenu && <PhoneMenu onNavigate={onPhoneNavigate}/>}
      {!phoneMenu && <Outlet />}
    </>
  );
};

export default Header;
