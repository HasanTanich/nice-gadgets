import "./Toaster.scss";

const Toaster = ({ message }: { message: string }) => {
  return (
    <div className="toasterContainer">
      <p className="small-text">{message}</p>
    </div>
  );
};

export default Toaster;
