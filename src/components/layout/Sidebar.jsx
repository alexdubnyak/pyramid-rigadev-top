import { useState } from 'react';
import Icon from '../common/Icon';
import './Sidebar.css';

const isNavItemActive = (id, currentPage) => {
  if (id === 'users') {
    return currentPage === 'users' || currentPage === 'users-sub';
  }
  if (id === 'cash-settlement') {
    return currentPage === 'cash-settlement' || currentPage === 'cash-balance';
  }
  return currentPage === id;
};

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
      <button
        type="button"
        className="sidebar__header"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <Icon name="menu-open" size="md" className="sidebar__header-icon" />
        {!isCollapsed && (
          <span className="sidebar__collapse-text">collapse</span>
        )}
      </button>

      <nav className="sidebar__nav">
        <button
          className="sidebar__nav-item"
          onClick={() => setIsDashboardOpen(!isDashboardOpen)}
        >
          <Icon name="dashboard" size="md" />
          {!isCollapsed && (
            <>
              <span>Dashboard</span>
              <span className="sidebar__nav-arrow">{isDashboardOpen ? '▼' : '▶'}</span>
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
            className={`sidebar__nav-item ${isNavItemActive(item.id, currentPage) ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <Icon name={item.icon} size="md" />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
