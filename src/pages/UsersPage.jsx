import { useState } from 'react';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import IconButton from '../components/common/IconButton';
import './UsersPage.css';

const UsersPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const mockUsers = [
    { name: 'AdDeer001', username: 'AdDeer001', cp: 'Commi 0% 0% 15% 0% 0% 0% 15% 0%' },
    { name: 'Test AD', username: 'Adtest001', cp: 'Commi 15% 0%' },
    { name: 'Test Ad 2', username: 'Adtest002', cp: 'Commi 15% 15% 15%' },
    { name: 'Test Ad 3', username: 'Adtest003', cp: 'Commi 15% 15%' },
    { name: 'arunad', username: 'arunad', cp: 'Commi 12% 15% 14%' },
    { name: 'com test', username: 'comtestAd', cp: 'Commi 15% 10% 0% 14%' },
    { name: 'lionad', username: 'lionad', cp: 'Commi 15% 15%' },
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
  ];

  const actions = [
    { icon: 'games-action', onClick: (row) => console.log('Games', row) },
    { icon: 'percent-action', onClick: (row) => console.log('Percent', row) },
    { icon: 'lock-action', onClick: (row) => console.log('Lock', row) },
    { icon: 'lock-person-action', onClick: (row) => console.log('Lock Person', row) },
    { icon: 'key-action', onClick: (row) => console.log('Key', row) },
    { icon: 'badge-action', onClick: (row) => console.log('Badge', row) },
  ];

  const stats = [
    { label: 'Total Settlement', value: '2124411.75' },
    { label: 'Total users', value: '0' },
    { label: 'Total users today', value: '0' },
    { label: 'Total users online', value: '0' },
  ];

  return (
    <div className="users-page">
      <Header 
        searchValue={searchValue}
        onSearch={(e) => setSearchValue(e.target.value)}
        showAddButton={true}
        onAddClick={() => console.log('Add clicked')}
      />
      <TableToolbar title="Users" stats={stats} />
      <Table columns={columns} data={mockUsers} actions={actions} />
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

export default UsersPage;
