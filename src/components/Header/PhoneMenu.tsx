import React from 'react';
import { NavLink } from 'react-router-dom';
import './PhoneMenu.scss';

import Heart  from '../../assets/icons/Heart.svg';
import Cart  from '../../assets/icons/Cart.svg';

const PhoneMenu = ({onNavigate} : {onNavigate: ()=> void}) => {
  return (
    <div className="phoneMenu">

      <div className="phoneMenu-menuItems">
        <NavLink to='/' className="phoneMenu-menuItems-item" onClick={onNavigate}>Home</NavLink>

        <NavLink to='/phones' className="phoneMenu-menuItems-item" onClick={onNavigate}>Phones</NavLink>
        
        <NavLink to='/tablets' className="phoneMenu-menuItems-item" onClick={onNavigate}>Tablets</NavLink>
        
        <NavLink to='/accessories' className="phoneMenu-menuItems-item" onClick={onNavigate}>Accessories</NavLink>
      </div>

      <div className="phoneMenu-bottomItems">
        <NavLink to='/favorites' className="phoneMenu-bottomItems-item" onClick={onNavigate}>
          <div>
            <img src={Heart} alt="heart icon" className="heartIcon" />
          </div>
        </NavLink>

        <NavLink to='/cart' className="phoneMenu-bottomItems-item" onClick={onNavigate}>
          <div >
            <img src={Cart} alt="heart icon" />
          </div>
        </NavLink>
      </div>
      
    </div>
  );
};

export default PhoneMenu;
