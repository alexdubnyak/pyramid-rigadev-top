import Icon from '../common/Icon';
import IconButton from '../common/IconButton';
import { getAssetPath } from '../../utils/getAssetPath';
import './TopBar.css';

const TopBar = ({ theme = 'light', onToggleTheme }) => {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <img 
          src={getAssetPath('Riga365 Admin Panel logo.svg')} 
          alt="Riga365" 
          className="topbar__logo"
        />
        <span className="topbar__brand">Riga 365</span>
      </div>
      
      <div className="topbar__right">
        <div className="topbar__user">
          <div className="topbar__user-avatar">
            <Icon name="account-circle" size="md" />
          </div>
          <div className="topbar__user-info">
            <span className="topbar__user-name">admin1</span>
            <span className="topbar__user-separator">|</span>
            <span className="topbar__user-company">Company</span>
          </div>
        </div>

        <div className="topbar__balance">
          <span>Balance:</span>
          <span className="topbar__balance-value">Unlimited</span>
        </div>

        <button
          type="button"
          className="topbar__theme"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <Icon name="dark-mode" size="md" />
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>

        <button className="topbar__logout">
          <Icon name="logout" size="md" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
