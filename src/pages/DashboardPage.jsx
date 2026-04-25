import { useState } from 'react';
import Icon from '../components/common/Icon';
import IconButton from '../components/common/IconButton';
import InfoTooltip from '../components/common/InfoTooltip';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import { getAssetPath } from '../utils/getAssetPath';
import './DashboardPage.css';

function buildDashboardMockRows() {
  const statuses = ['RUNNING', 'COMPLETED', 'PENDING', 'RESTARTED', 'FAILED'];
  const names = ['Draw_RL', 'Draw_SL', 'Draw_YL', 'Draw_TC', 'Draw_WM', 'Draw_WC'];
  const data = [];

  for (let i = 1; i <= 60; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const tickets = Math.floor(Math.random() * 1000);
    const amount = (Math.random() * 10000).toFixed(2);
    const payout = (Math.random() * 8000).toFixed(2);
    const commission = (Math.random() * 500).toFixed(2);

    const startDate = new Date(2026, 2, Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    const endDate = new Date(startDate.getTime() + Math.random() * 3600000);

    data.push({
      name: `${randomName}${String(i).padStart(4, '0')}`,
      calculateDate: startDate.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: randomStatus,
      tickets: String(tickets),
      totalAmount: amount,
      totalPayout: payout,
      totalCommission: commission,
      startDate: startDate.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      endDate: endDate.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      executionId: `m${Math.random().toString(36).substring(2, 15)}`,
      yantraId: `m${Math.random().toString(36).substring(2, 15)}`,
    });
  }

  return data;
}

const DashboardPage = ({ currentGame = 'dashboard-riga' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [minDate, setMinDate] = useState('2026-02-13');
  const [maxDate, setMaxDate] = useState('2026-03-15');

  const games = {
    'dashboard-riga': { label: 'Riga Lottery', logo: 'riga lottery.png' },
    'dashboard-scratch': { label: 'Scratch Lottery', logo: 'scratch lottery.png' },
    'dashboard-yantra': { label: 'Yantra Lottery', logo: 'yantra lottery.png' },
    'dashboard-triple': { label: 'Triple Chance', logo: 'tripple chance.png' },
    'dashboard-worli': { label: 'Worli Matka', logo: 'worli matka.png' },
    'dashboard-wheel': { label: 'Wheel Of Chance', logo: 'wheel of chance.png' },
  };

  const currentGameInfo = games[currentGame] || games['dashboard-riga'];

  const [mockData] = useState(() => buildDashboardMockRows());

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'calculateDate', label: 'Calculate date', sortable: true },
    { key: 'status', label: 'status', sortable: true },
    { key: 'tickets', label: '# of tickets', sortable: true },
    { key: 'totalAmount', label: 'Total amount', sortable: true },
    { key: 'totalPayout', label: 'Total payout', sortable: true },
    { key: 'totalCommission', label: 'Total com...', sortable: true },
    { key: 'startDate', label: 'Start date', sortable: true },
    { key: 'endDate', label: 'End date', sortable: true },
    { key: 'executionId', label: 'Execution ID', sortable: true },
    { key: 'yantraId', label: 'Yantra ID', sortable: true },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__balance-cards">
        {[
          {
            icon: 'card-credit-balance.png',
            iconWidth: '56px',
            label: 'Credit balance',
            tooltip:
              'Total credit limit assigned to your account (profile field "limit"). This value does not change when you adjust the dashboard period above. Super admin: there is no finite credit limit — the card shows "Unlimited".',
            value: (
              <img
                src={getAssetPath('infinity-symbol.svg')}
                alt="Unlimited"
                className="balance-card__infinity"
              />
            ),
          },
          {
            icon: 'card-available-balance.png',
            iconWidth: '60.56px',
            label: 'Available balance',
            tooltip:
              'Remaining credit: your limit minus used limit (limit - usedLimit). Super admin: unlimited — shown as "Unlimited".',
            value: (
              <img
                src={getAssetPath('infinity-symbol.svg')}
                alt="Unlimited"
                className="balance-card__infinity"
              />
            ),
          },
          {
            icon: 'card-upper-settlement.png',
            iconWidth: '55.35px',
            label: 'Upper settlement',
            tooltip:
              'Your settlement with the upper line. Snapshot from your profile; it is not filtered by the selected date range. Refresh the page to get the latest value after back-office changes.',
            value: <span className="balance-card__value">1,933,939.00</span>,
          },
          {
            icon: 'card-lower-settlement.png',
            iconWidth: '60.3px',
            label: 'Lower settlement',
            tooltip:
              'Aggregated settlement summed over all users in your downline tree. It is not filtered by the selected date range.',
            value: <span className="balance-card__value">1,933,939.00</span>,
          },
          {
            icon: 'card-total-commission.png',
            iconWidth: '59.42px',
            label: 'Total commission',
            tooltip:
              'Total commission across all games for the selected Dashboard period (top date range). Per-game stats use the Period range in the Game statistics block below.',
            value: <span className="balance-card__value">0</span>,
          },
        ].map((card) => (
          <div className="balance-card" key={card.label}>
            <div className="balance-card__info-slot">
              <InfoTooltip text={card.tooltip} />
            </div>
            <div className="balance-card__icon" style={{ width: card.iconWidth }}>
              <img src={getAssetPath(card.icon)} alt="" />
            </div>
            <div className="balance-card__body">
              <span className="balance-card__label">{card.label}</span>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-page__stats-bar">
        <div className="dashboard-page__game-info">
          <button className="dashboard-page__refresh-button">
            <Icon name="replay-icon" size="md" />
          </button>
          <img 
            src={getAssetPath(currentGameInfo.logo)} 
            alt={currentGameInfo.label}
            className="dashboard-page__game-logo"
          />
          <span className="dashboard-page__title">{currentGameInfo.label}</span>
        </div>
        <span className="dashboard-page__stat-item">Draws: <strong>1</strong></span>
        <span className="dashboard-page__stat-item">Pending draws: <strong>1</strong></span>
        <span className="dashboard-page__stat-item">Calculated draws: <strong>0</strong></span>
        <span className="dashboard-page__stat-item">Tickets: <strong>0</strong></span>
        <span className="dashboard-page__stat-item">Pending tickets: <strong>0</strong></span>
        <span className="dashboard-page__stat-item">Sum: <strong>0.00</strong></span>
        <span className="dashboard-page__stat-item">Payout: <strong>0.00</strong></span>
        <span className="dashboard-page__stat-item">Commission: <strong>0.00</strong></span>
      </div>

      <div className="dashboard-page__content">
        <div className="dashboard-page__content-header">
          <div className="dashboard-page__date-filters">
            <div className="dashboard-page__date-field dashboard-page__date-field--horizontal">
              <label>Minimum calculation date</label>
              <input 
                type="date" 
                value={minDate} 
                onChange={(e) => setMinDate(e.target.value)}
              />
            </div>
            <div className="dashboard-page__date-field dashboard-page__date-field--horizontal">
              <label>Maximum calculation date</label>
              <input 
                type="date" 
                value={maxDate} 
                onChange={(e) => setMaxDate(e.target.value)}
              />
            </div>
          </div>

          <div className="dashboard-page__toolbar">
            <IconButton icon="search" />
            <IconButton icon="filter" />
            <IconButton icon="view-column" />
            <IconButton icon="density-medium" />
            <IconButton icon="fullscreen" />
          </div>
        </div>
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
