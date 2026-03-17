import SearchInput from '../common/SearchInput';
import Button from '../common/Button';
import Icon from '../common/Icon';
import './Header.css';

const Header = ({ title, onSearch, searchValue, showAddButton = false, onAddClick }) => {
  return (
    <header className="header">
      <div className="header__search">
        <SearchInput 
          placeholder="Search"
          value={searchValue}
          onChange={onSearch}
        />
      </div>
      
      {showAddButton && (
        <Button 
          variant="secondary" 
          onClick={onAddClick}
          className="header__add-button"
        >
          <Icon name="add" size="lg" />
          Add Area Distributer
        </Button>
      )}
    </header>
  );
};

export default Header;
