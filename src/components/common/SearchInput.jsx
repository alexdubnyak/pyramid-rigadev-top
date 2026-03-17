import Icon from './Icon';
import './SearchInput.css';

const SearchInput = ({ placeholder = 'Search', value, onChange }) => {
  return (
    <div className="search-input">
      <Icon name="search" size="md" />
      <input 
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input__field"
      />
    </div>
  );
};

export default SearchInput;
