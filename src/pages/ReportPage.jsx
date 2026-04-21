import { useMemo, useState } from 'react';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import Button from '../components/common/Button';
import './ReportPage.css';

const YEARS = [2024, 2025, 2026, 2027];
const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1);

function formatRangeLabel(year, week) {
  const start = new Date(year, 0, 1 + (week - 1) * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = (d) =>
    d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

const ReportPage = () => {
  const [year, setYear] = useState(2026);
  const [week, setWeek] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rangeLabel = useMemo(() => formatRangeLabel(year, week), [year, week]);

  const mockRows = [
    {
      username: 'AdDeer001',
      game: 'Riga Lottery',
      round: 'Draw_RL001',
      date: '06/04/2026',
      roundTime: '06/04/2026 14:00',
    },
    {
      username: 'lionad',
      game: 'Yantra',
      round: 'Y-102',
      date: '07/04/2026',
      roundTime: '07/04/2026 09:30',
    },
  ];

  const columns = [
    { key: 'username', label: 'Username', sortable: true },
    { key: 'game', label: 'Game', sortable: true },
    { key: 'round', label: 'Round', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'roundTime', label: 'Round time/date', sortable: true },
  ];

  return (
    <div className="report-page">
      <div className="report-page__toolbar">
        <div className="report-page__filters">
          <div className="report-page__field">
            <label htmlFor="report-year">Year</label>
            <select
              id="report-year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
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
              {WEEKS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
          <p className="report-page__range" role="status">
            Date range: {rangeLabel}
          </p>
        </div>
        <div className="report-page__grouping">
          <span className="report-page__grouping-label">Group by:</span>
          <span className="report-page__tag">Username</span>
          <span className="report-page__tag">Game</span>
          <span className="report-page__tag">Round</span>
          <span className="report-page__tag">Date</span>
        </div>
        <div className="report-page__downloads">
          <Button variant="secondary" size="sm" type="button">Download xlsx</Button>
          <Button variant="secondary" size="sm" type="button">Download pdf</Button>
        </div>
      </div>

      <div className="report-page__table">
        <Table columns={columns} data={mockRows} />
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
