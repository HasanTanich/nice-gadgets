import React from 'react';
import './Footer.scss';

import { Logo, ArrowBlack}  from '../../assets/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">

      <div className="footer-logoBox">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="footer-items">
        <Link to="https://github.com/HasanTanich/nice-gadgets" className="footer-items-item">
          Github
        </Link>
        <Link to="#" className="footer-items-item">
          Contacts
        </Link>
        <Link to="#" className="footer-items-item">
          Rights
        </Link>
      </div>

      <div className="footer-backToTopBox">
        <p>Back to top</p>
        <button 
          type="button" 
          onClick={ ()=> window.scrollTo({top: 0, behavior: 'smooth'})}
          className="footer-backToTopBox-button"
        >
          <img src={ArrowBlack} alt="arrow up icon" />
        </button>
      </div>

    </div>
  );
};

export default Footer;
