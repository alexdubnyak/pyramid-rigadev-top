import { useState } from 'react';
import TableToolbar from '../components/table/TableToolbar';
import Pagination from '../components/table/Pagination';
import Button from '../components/common/Button';
import './ReportPage.css';

const YEARS = [2024, 2025, 2026, 2027];
const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1);
const GROUPS = ['Username', 'Game', 'Round', 'Date'];
const REPORT_COLUMNS = [
  { key: 'username', label: 'Username', align: 'left' },
  { key: 'game', label: 'Game', align: 'left' },
  { key: 'round', label: 'Round', align: 'left' },
  { key: 'date', label: 'Date', align: 'left' },
  { key: 'expand', label: '', align: 'center', narrow: true },
  { key: 'roundTime', label: 'Round time/date', align: 'left' },
  { key: 'totalSale', label: 'Total sale', align: 'right' },
  { key: 'totalWinnings', label: 'Total winnings', align: 'right' },
  { key: 'totalCommission', label: 'Total commission', align: 'right' },
  { key: 'totalBonus', label: 'Total bonus', align: 'right' },
  { key: 'settlement', label: 'Settlement', align: 'right' },
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

const REPORT_TOTALS = {
  totalSale: '26,850.00',
  totalWinnings: '56,000.00',
  totalCommission: '3,934.00',
  totalBonus: '4,600.00',
  settlement: '-37,684.00',
};

const ReportPage = () => {
  const [year, setYear] = useState(2024);
  const [week, setWeek] = useState(42);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              <Button variant="secondary" size="sm" className="report-page__download-button">Download pdf</Button>
              <Button variant="secondary" size="sm" className="report-page__download-button">Download xls</Button>
            </div>
          </TableToolbar>
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  {REPORT_COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      className={[
                        column.align === 'right' ? 'report-table__cell--right' : '',
                        column.align === 'center' ? 'report-table__cell--center' : '',
                        column.narrow ? 'report-table__header--narrow' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {column.label && (
                        <div className="report-table__header-content">
                          <span>{column.label}</span>
                          <span className="report-table__sort" aria-hidden="true">↑↓</span>
                          <span className="report-table__menu" aria-hidden="true">⋮</span>
                        </div>
                      )}
                      {column.key === 'expand' && (
                        <span className="report-table__collapse" aria-hidden="true">⌄</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REPORT_ROWS.map((row) => (
                  <tr key={row.username}>
                    {REPORT_COLUMNS.map((column) => (
                      <td
                        key={column.key}
                        className={[
                          column.align === 'right' ? 'report-table__cell--right' : '',
                          column.align === 'center' ? 'report-table__cell--center' : '',
                          column.narrow ? 'report-table__cell--narrow' : '',
                          ['totalSale', 'totalWinnings', 'totalCommission', 'totalBonus', 'settlement'].includes(column.key)
                            ? 'report-table__amount'
                            : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {column.key === 'expand' ? (
                          <span className="report-table__row-toggle">⌄</span>
                        ) : (
                          row[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  {REPORT_COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className={[
                        column.align === 'right' ? 'report-table__cell--right' : '',
                        column.narrow ? 'report-table__cell--narrow' : '',
                        ['totalSale', 'totalWinnings', 'totalCommission', 'totalBonus', 'settlement'].includes(column.key)
                          ? 'report-table__amount'
                          : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {REPORT_TOTALS[column.key] ?? ''}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
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

export default ReportPage;
