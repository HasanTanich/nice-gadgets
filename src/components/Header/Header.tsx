import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './Header.scss';

import Logo  from '../../assets/icons/Logo.svg';
import Heart  from '../../assets/icons/Heart.svg';
import Cart  from '../../assets/icons/Cart.svg';

const Header = () => {
  return (
    <>
      <nav className="header">
        <Link to="/" className="header-logoBox">
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
          <div className="header-buttonsRight-item">
            <Link to='/favorites' >
              <img src={Heart} alt="heart icon" />
            </Link>
          </div>
          <div className="header-buttonsRight-item">
            <Link to='/cart'>
              <img src={Cart} alt="heart icon" />
            </Link>
          </div>
        </div>

      </nav>
      <Outlet />
    </>
  );
};

export default Header;
