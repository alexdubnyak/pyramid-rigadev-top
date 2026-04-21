import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, onDismiss }) => {
  useEffect(() => {
    const id = window.setTimeout(onDismiss, 3200);
    return () => window.clearTimeout(id);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="toast" role="status">
      {message}
    </div>
  );
};

export default Toast;
