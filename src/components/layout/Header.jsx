import SearchInput from '../common/SearchInput';
import Button from '../common/Button';
import Icon from '../common/Icon';
import './Header.css';

const Header = ({ onSearch, searchValue, showAddButton = false, onAddClick, addButtonLabel = 'Add Area Distributer' }) => {
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
          {addButtonLabel}
        </Button>
      )}
    </header>
  );
};

export default Header;
