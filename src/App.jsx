import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import CreditBalancePage from './pages/CreditBalancePage';
import ReportPage from './pages/ReportPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard-riga');

  const renderPage = () => {
    if (currentPage.startsWith('dashboard')) {
      return <DashboardPage currentGame={currentPage} />;
    }
    
    switch (currentPage) {
      case 'users':
        return <UsersPage />;
      case 'credit-balance':
        return <CreditBalancePage />;
      case 'report':
        return <ReportPage />;
      default:
        return <DashboardPage currentGame={currentPage} />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="app__main">
        <TopBar />
        <main className="app__content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
