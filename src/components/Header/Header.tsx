import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './Header.scss';

import { Logo, Heart, Cart, Menu, Close } from '../../assets/icons';
import Footer from '../Footer/Footer';
import { useCart } from '../../core/ContextProviders/CartContext';

const Header = () => {
  // const { totalCount } = useCart();
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const onToggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize >= 640) {
      setActiveMenu(false);
    }
  }, [screenSize]);

  return (
    <>
      <nav className="header">

        <Link to="/" className="header-logoBox" onClick={() => setActiveMenu(false)}>
          <div className="header-logoBox-logo">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        <div className={`header-menu ${activeMenu ? 'header-menu-active' : ''}`}>

          <div className="header-menu-leftItems uppercase">
            <NavLink to='/' className="header-menu-leftItems-item" onClick={() => setActiveMenu(false)}>Home</NavLink>

            <NavLink to='/phones' className="header-menu-leftItems-item" onClick={() => setActiveMenu(false)}>Phones</NavLink>

            <NavLink to='/tablets' className="header-menu-leftItems-item" onClick={() => setActiveMenu(false)}>Tablets</NavLink>

            <NavLink to='/accessories' className="header-menu-leftItems-item" onClick={() => setActiveMenu(false)}>Accessories</NavLink>
          </div>

          <div className="header-menu-buttonsRight">
            <NavLink to='/favorites' className="header-menu-buttonsRight-item" onClick={() => setActiveMenu(false)}>
              <div>
                <img src={Heart} alt="heart icon" className="heartIcon" />
              </div>
            </NavLink>

            <NavLink to='/cart' className="header-menu-buttonsRight-item" onClick={() => setActiveMenu(false)}>
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

      <div style={activeMenu ? { display: 'none' } : {}}>
        <Outlet context={screenSize} />
      </div>
      <div style={activeMenu ? { display: 'none' } : {}} className="footerBox">
        <Footer />
      </div>
    </>
  );
};

export default Header;
