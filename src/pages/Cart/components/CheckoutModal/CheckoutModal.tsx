import { useCart } from '../../../../core/ContextProviders/CartContext';
import './CheckoutModal.scss';
import ReactDom from 'react-dom';

const CheckoutModal = ({open, onClose}: {open: boolean, onClose: ()=> void}) => {
  const {clearCart} = useCart();
  if(!open) return null;

  const onConfirm = () => {
    clearCart();
    onClose();
  };
  
  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        <h4 className="modal-message">
          Checkout is not implemented yet.
          <br />
          Do you want to clear the Cart?
        </h4>
        <div className="modal-actions">
          <button
            onClick={onConfirm}
            className="modal-actions-confirm"
          >
            Confirm
          </button>
          
          <button
            onClick={onClose}
            className="modal-actions-cancel"
          >
            Cancel
          </button>

        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default CheckoutModal;