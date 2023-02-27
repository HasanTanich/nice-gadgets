import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './Header.scss';

import { Logo, Heart, Cart, Menu, Close}  from '../../assets/icons';
import Footer from '../Footer/Footer';

const Header = ({screenSize} : {screenSize: number}) => {

  const [phone, setPhone] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  const onToggleMenu = () => {
    setActiveMenu(!activeMenu);
  };
  
  useEffect(() => {
    if (screenSize <= 640) {
      setPhone(true);
    } else {
      setPhone(false);
      setActiveMenu(false);
    }
  }, [screenSize]);

  return (
    <>
      <nav className="header">

        <Link to="/" className="header-logoBox" onClick={()=> setActiveMenu(false)}>
          <div className="header-logoBox-logo">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        <div className={`header-menu ${(!activeMenu === true && phone === true) ? 'phoneMenu' : ''}`}>

          <div className="header-menu-leftItems">
            <NavLink to='/' className="header-menu-leftItems-item" onClick={()=>setActiveMenu(false)}>Home</NavLink>
       
            <NavLink to='/phones' className="header-menu-leftItems-item" onClick={()=>setActiveMenu(false)}>Phones</NavLink>
        
            <NavLink to='/tablets' className="header-menu-leftItems-item" onClick={()=>setActiveMenu(false)}>Tablets</NavLink>
        
            <NavLink to='/accessories' className="header-menu-leftItems-item" onClick={()=>setActiveMenu(false)}>Accessories</NavLink>
          </div>

          <div className="header-menu-buttonsRight">
            <NavLink to='/favorites' className="header-menu-buttonsRight-item" onClick={()=>setActiveMenu(false)}>
              <div>
                <img src={Heart} alt="heart icon" className="heartIcon" />
              </div>
            </NavLink>

            <NavLink to='/cart' className="header-menu-buttonsRight-item" onClick={()=>setActiveMenu(false)}>
              <div >
                <img src={Cart} alt="heart icon" />
              </div>
            </NavLink>

          </div>
        </div>

        <button 
          type='button' 
          className="header-phone"
          onClick={onToggleMenu}
        >
          <img 
            src={activeMenu ? Close : Menu} 
            alt="menu icon" 
            className={`${activeMenu ? 'activeMenu' : 'normalMenu'}`}
          />
        </button>
      </nav>
      {(!activeMenu) && <Outlet context={{screenSize, phone}}/>}

      <Footer />
    </>
  );
};

export default Header;
