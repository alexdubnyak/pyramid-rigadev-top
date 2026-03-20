import './Icon.css';

import { getAssetPath } from '../../utils/getAssetPath';

const Icon = ({ name, size = 'md', className = '' }) => {
  return (
    <img 
      src={getAssetPath(`${name}.svg`)}
      alt={name}
      className={`icon icon--${size} ${className}`}
    />
  );
};

export default Icon;
