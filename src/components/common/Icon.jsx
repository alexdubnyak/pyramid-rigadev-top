import './Icon.css';

const Icon = ({ name, size = 'md', className = '' }) => {
  const iconPath = `/src/assets/${name}.svg`;
  
  return (
    <img 
      src={iconPath} 
      alt={name}
      className={`icon icon--${size} ${className}`}
    />
  );
};

export default Icon;
