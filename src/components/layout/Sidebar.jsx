import { useState } from 'react';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';
import './Sidebar.css';

const Sidebar = ({ currentPage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  const dashboardGames = [
    { id: 'dashboard-riga', label: 'Riga Lottery', logo: 'riga lottery.png' },
    { id: 'dashboard-scratch', label: 'Scratch Lottery', logo: 'scratch lottery.png' },
    { id: 'dashboard-yantra', label: 'Yantra Lottery', logo: 'yantra lottery.png' },
    { id: 'dashboard-triple', label: 'Triple Chance', logo: 'tripple chance.png' },
    { id: 'dashboard-worli', label: 'Worli Matka', logo: 'worli matka.png' },
    { id: 'dashboard-wheel', label: 'Wheel Of Chance', logo: 'wheel of chance.png' },
  ];

  const menuItems = [
    { id: 'users', icon: 'users', label: 'Users' },
    { id: 'credit-balance', icon: 'credit-card', label: 'Credit balance' },
    { id: 'cash-settlement', icon: 'cash-settlement', label: 'Cash settlement' },
    { id: 'report', icon: 'report', label: 'Report' },
    { id: 'transactions', icon: 'transactions', label: 'Transactions' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
    { id: 'permissions', icon: 'permissions', label: 'Permissions' },
    { id: 'operators', icon: 'operators', label: 'Operators' },
    { id: 'games', icon: 'games', label: 'Games' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        <IconButton 
          icon="menu-open" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar__toggle"
        />
        {!isCollapsed && (
          <img 
            src="/src/assets/Riga365 Admin Panel logo.svg" 
            alt="Riga365 Admin" 
            className="sidebar__logo"
          />
        )}
      </div>

      <div className="sidebar__user">
        <Icon name="account-circle" size="md" />
        {!isCollapsed && (
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">admin1</div>
            <div className="sidebar__user-company">Company</div>
          </div>
        )}
      </div>

      <div className="sidebar__balance">
        {!isCollapsed && <span>Balance:</span>}
        <Icon name="infinity" size="md" />
      </div>

      <nav className="sidebar__nav">
        <button
          className={`sidebar__nav-item ${currentPage.startsWith('dashboard') ? 'sidebar__nav-item--active' : ''}`}
          onClick={() => setIsDashboardOpen(!isDashboardOpen)}
        >
          <Icon name="dashboard" size="md" />
          {!isCollapsed && (
            <>
              <span>Dashboard</span>
              <span style={{ marginLeft: 'auto', fontSize: '12px' }}>{isDashboardOpen ? '▼' : '▶'}</span>
            </>
          )}
        </button>
        
        {isDashboardOpen && !isCollapsed && (
          <div className="sidebar__submenu">
            {dashboardGames.map(game => (
              <button
                key={game.id}
                className={`sidebar__submenu-item ${currentPage === game.id ? 'sidebar__submenu-item--active' : ''}`}
                onClick={() => onPageChange(game.id)}
              >
                {game.label}
              </button>
            ))}
          </div>
        )}

        {menuItems.map(item => (
          <button
            key={item.id}
            className={`sidebar__nav-item ${currentPage === item.id ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <Icon name={item.icon} size="md" />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__footer-item">
          <Icon name="dark-mode" size="md" />
          {!isCollapsed && <span>Theme mode</span>}
        </button>
        <button className="sidebar__footer-item">
          <Icon name="logout" size="md" />
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
