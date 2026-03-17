import { useState } from 'react';
import IconButton from '../components/common/IconButton';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import './DashboardPage.css';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('L');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [minDate, setMinDate] = useState('2026-02-13');
  const [maxDate, setMaxDate] = useState('2026-03-15');

  const tabs = [
    { id: 'L', name: 'riga lottery.png' },
    { id: 'S', name: 'scratch lottery.png' },
    { id: 'Y', name: 'yantra lottery.png' },
    { id: 'T', name: 'tripple chance.png' },
    { id: 'K', name: 'worli matka.png' },
    { id: 'W', name: 'wheel of chance.png' }
  ];

  const mockData = [
    { 
      name: 'Draw_RL25', 
      calculateDate: '26/02/2026 12:09:00', 
      status: 'RUNNING', 
      tickets: '0',
      totalAmount: '0.00',
      totalPayout: '0.00',
      totalCommission: '0.00'
    },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'calculateDate', label: 'Calculate date', sortable: true },
    { key: 'status', label: 'status', sortable: true },
    { key: 'tickets', label: '# of tickets', sortable: true },
    { key: 'totalAmount', label: 'Total amount', sortable: true },
    { key: 'totalPayout', label: 'Total payout', sortable: true },
    { key: 'totalCommission', label: 'Total com...', sortable: true },
  ];

  const stats = [
    { label: 'Total draws', value: '1' },
    { label: 'Total pending draws', value: '1' },
    { label: 'Total calculated draws', value: '0' },
    { label: 'Total tickets', value: '0' },
    { label: 'Total pending tickets', value: '0' },
    { label: 'Total Sum', value: '0.00' },
    { label: 'Total Payout', value: '0.00' },
    { label: 'Total Commission', value: '0.00' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`dashboard-page__tab ${activeTab === tab.id ? 'dashboard-page__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <img src={`/src/assets/${tab.name}`} alt={tab.id} />
          </button>
        ))}
      </div>

      <div className="dashboard-page__header">
        <IconButton icon="sync-alt" />
        <span className="dashboard-page__title">Lottery Stats</span>
        
        <div className="dashboard-page__date-filters">
          <div className="dashboard-page__date-field">
            <label>Minimum calculation date</label>
            <input 
              type="date" 
              value={minDate} 
              onChange={(e) => setMinDate(e.target.value)}
            />
          </div>
          <div className="dashboard-page__date-field">
            <label>Maximum calculation date</label>
            <input 
              type="date" 
              value={maxDate} 
              onChange={(e) => setMaxDate(e.target.value)}
            />
          </div>
        </div>

        <div className="dashboard-page__stats">
          {stats.map((stat, index) => (
            <div key={index} className="dashboard-page__stat">
              <span className="dashboard-page__stat-label">{stat.label}:</span>
              <span className="dashboard-page__stat-value">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-page__toolbar">
          <IconButton icon="search" />
          <IconButton icon="filter" />
          <IconButton icon="view-column" />
          <IconButton icon="density-medium" />
          <IconButton icon="fullscreen" />
        </div>
      </div>

      <div className="dashboard-page__content">
        <Table columns={columns} data={mockData} />
        <Pagination 
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
