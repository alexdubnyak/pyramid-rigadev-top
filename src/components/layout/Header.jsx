import SearchInput from '../common/SearchInput';
import Button from '../common/Button';
import Icon from '../common/Icon';
import './Header.css';

const Header = ({
  onSearch,
  searchValue,
  showAddButton = false,
  onAddClick,
  addButtonLabel = 'Add Area Distributor',
  stacked = false,
  buttonSize = 'mid',
}) => {
  const className = ['header', stacked ? 'header--stacked' : ''].filter(Boolean).join(' ');

  return (
    <header className={className}>
      <div className="header__search">
        <SearchInput 
          placeholder="Search"
          value={searchValue}
          onChange={onSearch}
        />
      </div>
      
      {showAddButton && (
        <Button 
          variant="accent"
          size={buttonSize}
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
