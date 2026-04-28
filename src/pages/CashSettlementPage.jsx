import { useState } from 'react';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import './CashSettlementPage.css';

const CashSettlementPage = ({ onOpenBalanceHistory }) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const mockData = [
    { name: 'AdDeer001', username: 'AdDeer001', cp: 'Commi 0% 0%', balance: '12,450.00' },
    { name: 'Test AD', username: 'Adtest001', cp: 'Commi 15% 0%', balance: '0.00' },
    { name: 'lionad', username: 'lionad', cp: 'Commi 15% 15%', balance: '3,200.50' },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'cp', label: 'C/P', sortable: true },
    { key: 'balance', label: 'Balance', sortable: true },
  ];

  const actions = [
    {
      icon: 'replay-icon',
      onClick: (row) => onOpenBalanceHistory?.(row),
    },
  ];

  const stats = [
    { label: 'Total balance', value: '15,650.50' },
    { label: 'Total accounts', value: '3' },
    { label: 'Settled today', value: '0' },
    { label: 'Pending', value: '1' },
  ];

  const totalPages = Math.max(1, Math.ceil(mockData.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstRowIndex = (safeCurrentPage - 1) * rowsPerPage;
  const paginatedData = mockData.slice(firstRowIndex, firstRowIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="cash-settlement-page">
      <Header
        searchValue={searchValue}
        onSearch={(e) => setSearchValue(e.target.value)}
        showAddButton={false}
      />
      <div className="cash-settlement-page__content">
        <div className="cash-settlement-page__content-top">
          <TableToolbar
            title="Cash settlement"
            stats={stats}
            icon="cash-settlement-sidebar.png"
          />
          <Table columns={columns} data={paginatedData} actions={actions} />
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

export default CashSettlementPage;
