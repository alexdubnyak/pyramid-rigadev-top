import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import CreditBalancePage from './pages/CreditBalancePage';
import ReportPage from './pages/ReportPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'credit-balance':
        return <CreditBalancePage />;
      case 'report':
        return <ReportPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="app__content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
