import { useState } from 'react';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import Button from '../components/common/Button';
import './ReportPage.css';

const YEARS = [2024, 2025, 2026, 2027];
const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1);
const GROUPS = ['Username', 'Game', 'Round', 'Date'];

const renderAmount = (key) => (row) => (
  <span className="report-page__amount">{row[key]}</span>
);

const REPORT_COLUMNS = [
  { key: 'username', label: 'Username', sortable: true },
  { key: 'game', label: 'Game', sortable: true },
  { key: 'round', label: 'Round', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'roundTime', label: 'Round time/date', sortable: true },
  { key: 'totalSale', label: 'Total sale', sortable: true, render: renderAmount('totalSale') },
  { key: 'totalWinnings', label: 'Total winnings', sortable: true, render: renderAmount('totalWinnings') },
  { key: 'totalCommission', label: 'Total commission', sortable: true, render: renderAmount('totalCommission') },
  { key: 'totalBonus', label: 'Total bonus', sortable: true, render: renderAmount('totalBonus') },
  { key: 'settlement', label: 'Settlement', sortable: true, render: renderAmount('settlement') },
];

const REPORT_ROWS = [
  {
    username: 'arunad (1)',
    game: '',
    round: '',
    date: '',
    roundTime: 'Total: 1',
    totalSale: '1,000.00',
    totalWinnings: '10,000.00',
    totalCommission: '140.00',
    totalBonus: '1,000.00',
    settlement: '-10,140.00',
  },
  {
    username: 'comtestAd (1)',
    game: '',
    round: '',
    date: '',
    roundTime: 'Total: 2',
    totalSale: '15,750.00',
    totalWinnings: '36,000.00',
    totalCommission: '2,305.00',
    totalBonus: '3,600.00',
    settlement: '-26,155.00',
  },
];

const ReportPage = () => {
  const [year, setYear] = useState(2024);
  const [week, setWeek] = useState(42);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.max(1, Math.ceil(REPORT_ROWS.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstRowIndex = (safeCurrentPage - 1) * rowsPerPage;
  const paginatedRows = REPORT_ROWS.slice(firstRowIndex, firstRowIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="report-page">
      <div className="report-page__top">
        <div className="report-page__period-controls">
          <div className="report-page__period" aria-label="Report period">
            <div className="report-page__field">
              <label htmlFor="report-year">Year</label>
              <select
                id="report-year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {YEARS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="report-page__field">
              <label htmlFor="report-week">Week</label>
              <select
                id="report-week"
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
              >
                {WEEKS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <span className="report-page__date-range">04/11/2024 - 10/11/2024</span>
        </div>

        <div className="report-page__grouping" aria-label="Report grouping">
          <span className="report-page__grouping-label">Grouped by</span>
          {GROUPS.map((group, index) => (
            <span className="report-page__group-segment" key={group}>
              <span className="report-page__chip">
                {group}
                <button
                  type="button"
                  className="report-page__chip-remove"
                  aria-label={`Remove ${group} grouping`}
                >
                  ×
                </button>
              </span>
              {index < GROUPS.length - 1 && (
                <span className="report-page__then">, then by</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="report-page__content">
        <div className="report-page__content-top">
          <TableToolbar title="Weekly report" stats={[]} icon="report-sidebar.png">
            <div className="report-page__downloads">
              <Button variant="accent" size="small" className="report-page__download-button">Download PDF</Button>
              <Button variant="accent" size="small" className="report-page__download-button">Download XLS</Button>
            </div>
          </TableToolbar>
          <Table columns={REPORT_COLUMNS} data={paginatedRows} />
        </div>
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};

export default ReportPage;
