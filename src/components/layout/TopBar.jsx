import { getAssetPath } from '../../utils/getAssetPath';
import './TopBar.css';

const TopBar = ({ theme = 'light', onToggleTheme }) => {
  const themeIcon = theme === 'dark' ? 'light-mode-topbar.png' : 'dark-mode-topbar.png';
  const themeLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';

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
            <img
              src={getAssetPath('account-topbar.png')}
              alt=""
              className="topbar__icon"
            />
          </div>
          <div className="topbar__user-info">
            <span className="topbar__user-name">admin1</span>
            <span className="topbar__user-separator">|</span>
            <span className="topbar__user-company">Company</span>
          </div>
        </div>

        <div className="topbar__balance">
          <img
            src={getAssetPath('balance-topbar.png')}
            alt=""
            className="topbar__icon"
          />
          <span>Balance:</span>
          <span className="topbar__balance-value">Unlimited</span>
        </div>

        <button
          type="button"
          className="topbar__theme"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <img
            src={getAssetPath(themeIcon)}
            alt=""
            className="topbar__icon"
          />
          <span>{themeLabel}</span>
        </button>

        <button className="topbar__logout">
          <img
            src={getAssetPath('logout-topbar.png')}
            alt=""
            className="topbar__icon"
          />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
