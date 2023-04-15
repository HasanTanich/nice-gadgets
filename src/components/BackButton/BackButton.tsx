import { useNavigate } from 'react-router-dom';
import { ArrowBlack } from '../../assets/icons';
import './BackButton.scss';

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <div className="backBtn" onClick={() => navigate(-1)}>
        <img src={ArrowBlack} alt="Arrow icon" className="leftArrow"/>
        <p className="small-text">Back</p>
      </div>
  )
}

export default BackButton