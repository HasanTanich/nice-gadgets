import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Phones.scss';

const Phones = () => {
  const { phoneId } = useParams();
  const navigate = useNavigate();
  
  if(phoneId) return <Outlet />;

  return (
    <div className="container">
      <h1 className="pageTitle">
        Mobile Phones
      </h1>

      <button type='button' onClick={()=> {
        navigate('123');
      }}>
        go to id 1
      </button>
    </div>
  );
};

export default Phones;
