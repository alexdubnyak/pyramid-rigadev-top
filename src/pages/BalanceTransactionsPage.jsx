import { useState } from 'react';
import Icon from '../components/common/Icon';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import Button from '../components/common/Button';
import './BalanceTransactionsPage.css';

const BalanceTransactionsPage = ({ user, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [minDate, setMinDate] = useState('2026-02-01');
  const [maxDate, setMaxDate] = useState('2026-04-09');

  const mockRows = [
    {
      source: 'admin1',
      target: user?.username ?? 'AdDeer001',
      description: 'Settlement',
      before: '1,000.00',
      amount: '250.00',
    },
    {
      source: user?.username ?? 'AdDeer001',
      target: 'sub01',
      description: 'Transfer',
      before: '750.00',
      amount: '-100.00',
    },
  ];

  const columns = [
    { key: 'source', label: 'Source user', sortable: true },
    { key: 'target', label: 'Target user', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'before', label: 'Before', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
  ];

  return (
    <div className="balance-transactions-page">
      <div className="balance-transactions-page__top">
        <button type="button" className="balance-transactions-page__back" onClick={onBack}>
          <Icon name="chevron-left" size="md" />
          <span>Back</span>
        </button>
        <h1 className="balance-transactions-page__title">
          Balance transactions{user?.username ? ` — ${user.username}` : ''}
        </h1>
      </div>

      <div className="balance-transactions-page__filters">
        <div className="balance-transactions-page__field">
          <label htmlFor="min-tx-date">Minimum transaction date</label>
          <input
            id="min-tx-date"
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
          />
        </div>
        <div className="balance-transactions-page__field">
          <label htmlFor="max-tx-date">Maximum transaction date</label>
          <input
            id="max-tx-date"
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
          />
        </div>
        <div className="balance-transactions-page__downloads">
          <Button variant="secondary" size="sm">Download xlsx</Button>
          <Button variant="secondary" size="sm">Download pdf</Button>
        </div>
      </div>

      <div className="balance-transactions-page__table">
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

export default BalanceTransactionsPage;
