import { useState } from 'react';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import Button from '../components/common/Button';
import DatePicker from '../components/common/DatePicker';
import './TransactionsPage.css';

const renderAmount = (key) => (row) => (
  <span className="transactions-page__amount">{row[key]}</span>
);

const TRANSACTION_COLUMNS = [
  { key: 'source', label: 'Source user', sortable: true },
  { key: 'target', label: 'Target user', sortable: true },
  { key: 'description', label: 'Description', sortable: true },
  { key: 'before', label: 'Before', sortable: true, render: renderAmount('before') },
  { key: 'amount', label: 'Amount', sortable: true, render: renderAmount('amount') },
  { key: 'after', label: 'After', sortable: true, render: renderAmount('after') },
  { key: 'transactionTime', label: 'Transaction time', sortable: true },
];

const TRANSACTION_ROWS = [
  {
    source: 'admin1',
    target: 'AdDeer001',
    description: 'Commission',
    before: '5,000.00',
    amount: '120.00',
    after: '5,120.00',
    transactionTime: '04/11/2024 10:24',
  },
  {
    source: 'AdDeer001',
    target: 'sub01',
    description: 'Payout',
    before: '4,880.00',
    amount: '-200.00',
    after: '4,680.00',
    transactionTime: '04/11/2024 11:08',
  },
];

const TransactionsPage = () => {
  const [minDate, setMinDate] = useState('2026-02-01');
  const [maxDate, setMaxDate] = useState('2026-04-09');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.max(1, Math.ceil(TRANSACTION_ROWS.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstRowIndex = (safeCurrentPage - 1) * rowsPerPage;
  const paginatedRows = TRANSACTION_ROWS.slice(firstRowIndex, firstRowIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="transactions-page">
      <div className="transactions-page__top">
        <div className="transactions-page__period-controls">
          <div className="transactions-page__period" aria-label="Transactions period">
            <DatePicker label="Minimum date" value={minDate} onChange={setMinDate} />
            <DatePicker label="Maximum date" value={maxDate} onChange={setMaxDate} />
          </div>
        </div>
      </div>

      <div className="transactions-page__content">
        <div className="transactions-page__content-top">
          <TableToolbar title="Transactions" stats={[]} icon="transactions-sidebar.png">
            <div className="transactions-page__downloads">
              <Button variant="accent" size="small" className="transactions-page__download-button">Download PDF</Button>
              <Button variant="accent" size="small" className="transactions-page__download-button">Download XLS</Button>
            </div>
          </TableToolbar>
          <Table columns={TRANSACTION_COLUMNS} data={paginatedRows} />
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

export default TransactionsPage;
