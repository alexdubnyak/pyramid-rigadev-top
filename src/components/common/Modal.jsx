import Button from './Button';
import './Modal.css';

const Modal = ({ title, children, onClose, primaryLabel = 'Save', onPrimary, primaryVariant = 'primary' }) => {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">{title}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {onPrimary && (
          <div className="modal__footer">
            <Button variant={primaryVariant} onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
