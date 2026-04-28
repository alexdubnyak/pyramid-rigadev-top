import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Modal from './components/common/Modal';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import CreditBalancePage from './pages/CreditBalancePage';
import ReportPage from './pages/ReportPage';
import CashSettlementPage from './pages/CashSettlementPage';
import BalanceTransactionsPage from './pages/BalanceTransactionsPage';
import TransactionsPage from './pages/TransactionsPage';
import SettingsPage from './pages/SettingsPage';
import PermissionsPage from './pages/PermissionsPage';
import OperatorsPage from './pages/OperatorsPage';
import GamesPage from './pages/GamesPage';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [currentPage, setCurrentPage] = useState('dashboard-riga');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const [usersSubParent, setUsersSubParent] = useState(null);
  const [usersSubFrom, setUsersSubFrom] = useState('users');
  const [cashHistoryUser, setCashHistoryUser] = useState(null);
  const [addDistributorOpen, setAddDistributorOpen] = useState(false);
  const [distributorForm, setDistributorForm] = useState({
    name: '',
    username: '',
    password: '',
    pctTriple: '',
    pctWorli: '',
    pctYantra: '',
  });

  const handleNavChange = (page) => {
    setUsersSubParent(null);
    setUsersSubFrom('users');
    setCashHistoryUser(null);
    setCurrentPage(page);
    setIsMobileNavOpen(false);
  };

  const openUsersSub = (row, from = 'users') => {
    setUsersSubParent(row);
    setUsersSubFrom(from);
    setCurrentPage('users-sub');
  };

  const renderPage = () => {
    if (currentPage.startsWith('dashboard')) {
      return <DashboardPage currentGame={currentPage} />;
    }

    switch (currentPage) {
      case 'users':
        return (
          <UsersPage
            mode="list"
            onViewSubUsers={(row) => openUsersSub(row, 'users')}
            onAddClick={() => setAddDistributorOpen(true)}
          />
        );
      case 'users-sub':
        return (
          <UsersPage
            mode="sub"
            parentUser={usersSubParent}
            backLabel={usersSubFrom === 'credit-balance' ? 'Credit balance' : 'Users'}
            onBack={() => {
              setUsersSubParent(null);
              setCurrentPage(usersSubFrom === 'credit-balance' ? 'credit-balance' : 'users');
            }}
          />
        );
      case 'credit-balance':
        return (
          <CreditBalancePage onViewSubUsers={(row) => openUsersSub(row, 'credit-balance')} />
        );
      case 'cash-settlement':
        return (
          <CashSettlementPage
            onOpenBalanceHistory={(row) => {
              setCashHistoryUser(row);
              setCurrentPage('cash-balance');
            }}
          />
        );
      case 'cash-balance':
        return (
          <BalanceTransactionsPage
            user={cashHistoryUser}
            onBack={() => {
              setCashHistoryUser(null);
              setCurrentPage('cash-settlement');
            }}
          />
        );
      case 'transactions':
        return <TransactionsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'permissions':
        return <PermissionsPage />;
      case 'operators':
        return <OperatorsPage />;
      case 'games':
        return <GamesPage />;
      case 'report':
        return <ReportPage />;
      default:
        return <DashboardPage currentGame={currentPage} />;
    }
  };

  const updateDistributorField = (key, value) => {
    setDistributorForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`app ${isMobileNavOpen ? 'app--mobile-nav-open' : ''}`}>
      <button
        type="button"
        className="app__mobile-scrim"
        aria-label="Close navigation"
        onClick={() => setIsMobileNavOpen(false)}
      />
      <Sidebar currentPage={currentPage} onPageChange={handleNavChange} />
      <div className="app__main">
        <TopBar
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenuClick={() => setIsMobileNavOpen(true)}
        />
        <main className="app__content">
          {renderPage()}
        </main>
      </div>

      {addDistributorOpen && (
        <Modal
          title="Add Area Distributor"
          onClose={() => setAddDistributorOpen(false)}
          primaryLabel="CREATE"
          onPrimary={() => setAddDistributorOpen(false)}
        >
          <div className="modal__field">
            <label htmlFor="ad-name">Name</label>
            <input
              id="ad-name"
              value={distributorForm.name}
              onChange={(e) => updateDistributorField('name', e.target.value)}
            />
          </div>
          <div className="modal__field">
            <label htmlFor="ad-username">Username</label>
            <input
              id="ad-username"
              value={distributorForm.username}
              onChange={(e) => updateDistributorField('username', e.target.value)}
            />
          </div>
          <div className="modal__field">
            <label htmlFor="ad-password">Password</label>
            <input
              id="ad-password"
              type="password"
              value={distributorForm.password}
              onChange={(e) => updateDistributorField('password', e.target.value)}
            />
          </div>
          <div className="modal__field modal__field--readonly">
            <label>Role</label>
            <span>Area Distributor</span>
          </div>
          <div className="modal__field">
            <label htmlFor="ad-type">Type</label>
            <select id="ad-type" defaultValue="Partnership">
              <option value="Partnership">Partnership</option>
            </select>
          </div>
          <div className="modal__field">
            <label htmlFor="ad-pct-triple">Partnership % for group &apos;Triple chance&apos;</label>
            <input
              id="ad-pct-triple"
              type="number"
              value={distributorForm.pctTriple}
              onChange={(e) => updateDistributorField('pctTriple', e.target.value)}
            />
          </div>
          <div className="modal__field">
            <label htmlFor="ad-pct-worli">Partnership % for group &apos;Worli Group (OTHER)&apos;</label>
            <input
              id="ad-pct-worli"
              type="number"
              value={distributorForm.pctWorli}
              onChange={(e) => updateDistributorField('pctWorli', e.target.value)}
            />
          </div>
          <div className="modal__field">
            <label htmlFor="ad-pct-yantra">Partnership % for group &apos;Yantra Group&apos;</label>
            <input
              id="ad-pct-yantra"
              type="number"
              value={distributorForm.pctYantra}
              onChange={(e) => updateDistributorField('pctYantra', e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
