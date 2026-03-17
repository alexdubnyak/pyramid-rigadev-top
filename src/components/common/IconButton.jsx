import Icon from './Icon';
import './IconButton.css';

const IconButton = ({ icon, size = 'md', onClick, className = '' }) => {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <Icon name={icon} size={size} />
    </button>
  );
};

export default IconButton;
