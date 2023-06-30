import ReactDom from "react-dom";
import { useCart } from "../../../../core/ContextProviders/CartContext";
import "./CheckoutModal.scss";

const CheckoutModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { clearCart } = useCart();
  if (!open) return null;

  const onConfirm = () => {
    clearCart();
    onClose();
  };

  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        <h4 className="modal-message-1">Checkout is not implemented yet.</h4>
        <h4 className="modal-message-2">Do you want to clear the Cart?</h4>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-actions-confirm">
            Confirm
          </button>

          <button onClick={onClose} className="modal-actions-cancel">
            Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default CheckoutModal;
