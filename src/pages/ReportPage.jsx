import { useState } from 'react';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import './ReportPage.css';

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState('L');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tabs = ['L', 'S', 'Y', 'T', 'K', 'W'];

  const mockLotteryData = [
    { 
      name: 'Draw_RL25', 
      calculateDate: '26/02/2026 12:09:00', 
      status: 'RUNNING', 
      tickets: '0',
      totalAmount: '0.00',
      totalPayout: '0.00',
      totalCommission: '0.00',
      totalBonus: '0.00'
    },
  ];

  const mockTripleChanceData = [
    { 
      name: 'Test_TC04 (AMD)', 
      status: 'PLACE_BETS', 
      tickets: '0',
      totalAmount: '0.00',
      totalPayout: '0.00',
      totalCommission: '0.00',
      startDate: '15/03/2026 19:24:10',
      endDate: '15/03/2026 19:24:24'
    },
    { 
      name: 'Test_admin (AMD)', 
      status: 'PLACE_BETS', 
      tickets: '0',
      totalAmount: '0.00',
      totalPayout: '0.00',
      totalCommission: '0.00',
      startDate: '15/03/2026 19:24:02',
      endDate: '15/03/2026 19:24:30'
    },
    { 
      name: 'Triple test new (A...', 
      status: 'PLACE_BETS', 
      tickets: '0',
      totalAmount: '0.00',
      totalPayout: '0.00',
      totalCommission: '0.00',
      startDate: '15/03/2026 19:24:02',
      endDate: '15/03/2026 19:24:30'
    },
  ];

  const lotteryColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'calculateDate', label: 'Calculate date', sortable: true },
    { key: 'status', label: 'status', sortable: true },
    { key: 'tickets', label: '# of tickets', sortable: true },
    { key: 'totalAmount', label: 'Total amount', sortable: true },
    { key: 'totalPayout', label: 'Total payout', sortable: true },
    { key: 'totalCommission', label: 'Total com...', sortable: true },
    { key: 'totalBonus', label: 'Total bonus...', sortable: true },
  ];

  const tripleChanceColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'status', sortable: true },
    { key: 'tickets', label: '# of ticket...', sortable: true },
    { key: 'totalAmount', label: 'Total amount', sortable: true },
    { key: 'totalPayout', label: 'Total payout', sortable: true },
    { key: 'totalCommission', label: 'Total com...', sortable: true },
    { key: 'startDate', label: 'Start date', sortable: true },
    { key: 'endDate', label: 'End date', sortable: true },
  ];

  const renderLotteryStats = () => (
    <div className="report-page__stats">
      <button className="report-page__refresh">
        <img src="/src/assets/sync-alt.svg" alt="refresh" />
        LOAD MORE
      </button>
      <span className="report-page__title">Lottery Stats</span>
      <div className="report-page__dates">
        <div className="report-page__date-field">
          <label>Minimum calculation date</label>
          <input type="date" value="2026-02-13" />
        </div>
        <div className="report-page__date-field">
          <label>Maximum calculation date</label>
          <input type="date" value="2026-03-15" />
        </div>
      </div>
      <div className="report-page__stats-info">
        <span>Total draws: 1</span>
        <span>Total pending draws: 1</span>
        <span>Total calculated draws: 0</span>
        <span>Total tickets: 0</span>
        <span>Total pending tickets: 0</span>
        <span>Total Sum: 0.00</span>
        <span>Total Payout: 0.00</span>
        <span>Total Commission: 0.00</span>
      </div>
    </div>
  );

  const renderTripleChanceStats = () => (
    <div className="report-page__stats">
      <button className="report-page__refresh">
        <img src="/src/assets/sync-alt.svg" alt="refresh" />
        LOAD MORE
      </button>
      <span className="report-page__title">Triple Chance Stats</span>
      <div className="report-page__dates">
        <div className="report-page__date-field">
          <label>Minimum start date</label>
          <input type="date" value="2026-03-08" />
        </div>
        <div className="report-page__date-field">
          <label>Maximum end date</label>
          <input type="date" value="2026-03-15" />
        </div>
      </div>
      <div className="report-page__stats-info">
        <span>Total executions: 500</span>
        <span>Total finished executions: 500</span>
        <span>Total sold tickets: 0</span>
        <span>Total Sum: 0.00</span>
        <span>Total Payout: 0.00</span>
        <span>Total Commission: 0.00</span>
      </div>
    </div>
  );

  return (
    <div className="report-page">
      <div className="report-page__tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`report-page__tab ${activeTab === tab ? 'report-page__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'L' && renderLotteryStats()}
      {activeTab === 'T' && renderTripleChanceStats()}

      <div className="report-page__table">
        <Table 
          columns={activeTab === 'L' ? lotteryColumns : tripleChanceColumns} 
          data={activeTab === 'L' ? mockLotteryData : mockTripleChanceData} 
        />
        <Pagination 
          currentPage={currentPage}
          totalPages={activeTab === 'L' ? 1 : 50}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    </div>
  );
};

export default ReportPage;
