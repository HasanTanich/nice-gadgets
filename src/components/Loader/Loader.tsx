import { BiLoaderAlt } from "react-icons/bi";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <BiLoaderAlt className="rotate-element" />
    </div>
  );
};

export default Loader;
