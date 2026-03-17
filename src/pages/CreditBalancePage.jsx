import { useState } from 'react';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import IconButton from '../components/common/IconButton';
import './CreditBalancePage.css';

const CreditBalancePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const mockData = [
    { name: 'AdDeer001', username: 'AdDeer001', cp: 'Commi 0% 0% 15% 0% 0% 0% 15% 0%', totalLimit: '1,500,000.00', remainingLimit: '600,000.00' },
    { name: 'Test AD', username: 'Adtest001', cp: 'Commi 15% 0%', totalLimit: '0.00', remainingLimit: '0.00' },
    { name: 'Test Ad 2', username: 'Adtest002', cp: 'Commi 15% 15% 15%', totalLimit: '500,000.00', remainingLimit: '100,000.00' },
    { name: 'Test Ad 3', username: 'Adtest003', cp: 'Commi 15% 15%', totalLimit: '500,000.00', remainingLimit: '100,000.00' },
    { name: 'arunad', username: 'arunad', cp: 'Commi 12% 15% 14%', totalLimit: '500,000.00', remainingLimit: '200,000.00' },
    { name: 'com test', username: 'comtestAd', cp: 'Commi 15% 10% 0% 14%', totalLimit: '1,000,000.00', remainingLimit: '500,000.00' },
    { name: 'lionad', username: 'lionad', cp: 'Commi 15% 15%', totalLimit: '500,000.00', remainingLimit: '100,000.00' },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { 
      key: 'username', 
      label: 'Username', 
      sortable: true,
      render: (row) => (
        <div className="username-cell">
          <span>{row.username}</span>
          <IconButton icon="search-action" />
          <IconButton icon="people-action" />
        </div>
      )
    },
    { key: 'cp', label: 'C/P', sortable: true },
    { key: 'totalLimit', label: 'Total limit', sortable: true },
    { key: 'remainingLimit', label: 'Remaining limit', sortable: true },
  ];

  const actions = [
    { icon: 'cash-settlement', onClick: (row) => console.log('Cash', row) },
  ];

  const stats = [];

  return (
    <div className="credit-balance-page">
      <Header 
        searchValue={searchValue}
        onSearch={(e) => setSearchValue(e.target.value)}
        showAddButton={true}
        onAddClick={() => console.log('Add clicked')}
      />
      <TableToolbar title="Credit balance" stats={stats} />
      <Table columns={columns} data={mockData} actions={actions} />
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

export default CreditBalancePage;
