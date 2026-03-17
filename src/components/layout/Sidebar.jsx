import { useState } from 'react';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';
import './Sidebar.css';

const Sidebar = ({ currentPage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
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
