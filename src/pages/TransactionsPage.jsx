import { useState } from 'react';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import IconButton from '../components/common/IconButton';
import Button from '../components/common/Button';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [minDate, setMinDate] = useState('2026-02-01');
  const [maxDate, setMaxDate] = useState('2026-04-09');

  const mockRows = [
    {
      source: 'admin1',
      target: 'AdDeer001',
      description: 'Commission',
      before: '5,000.00',
      amount: '120.00',
    },
    {
      source: 'AdDeer001',
      target: 'sub01',
      description: 'Payout',
      before: '4,880.00',
      amount: '-200.00',
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
    <div className="transactions-page">
      <Header
        searchValue={searchValue}
        onSearch={(e) => setSearchValue(e.target.value)}
        showAddButton={false}
      />
      <TableToolbar title="Transactions" stats={[]} icon="transactions.png" />
      <div className="transactions-page__filters">
        <div className="transactions-page__field">
          <label htmlFor="min-date-stats">Minimum date</label>
          <input
            id="min-date-stats"
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
          />
        </div>
        <div className="transactions-page__field">
          <label htmlFor="max-date-stats">Maximum date</label>
          <input
            id="max-date-stats"
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
          />
        </div>
        <div className="transactions-page__downloads">
          <Button variant="secondary" size="sm">Download xlsx</Button>
          <Button variant="secondary" size="sm">Download pdf</Button>
        </div>
        <div className="transactions-page__toolbar">
          <IconButton icon="search" />
          <IconButton icon="filter" />
          <IconButton icon="view-column" />
          <IconButton icon="density-medium" />
        </div>
      </div>
      <Table columns={columns} data={mockRows} />
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default TransactionsPage;
