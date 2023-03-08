import './Reload.scss';
import { FiRefreshCcw } from 'react-icons/fi';

const Reload = () => {
  return (
    <div className="reload-container">
      <button className="reload-button" onClick={()=> location.reload()}>
        Refresh <FiRefreshCcw />
      </button>
    </div>
  );
};

export default Reload;