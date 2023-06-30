import { Link } from "react-router-dom";
import { ArrowBlack, Logo } from "../../assets/icons";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logoBox">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="footer-items uppercase">
        <Link
          to="https://github.com/HasanTanich/nice-gadgets"
          className="footer-items-item"
        >
          Github
        </Link>
        <Link to="#" className="footer-items-item">
          Contacts
        </Link>
        <Link to="#" className="footer-items-item">
          Rights
        </Link>
      </div>

      <div className="footer-backToTopBox small-text">
        <p>Back to top</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="footer-backToTopBox-button"
        >
          <img src={ArrowBlack} alt="arrow up icon" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
