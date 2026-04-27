import { useCallback, useState } from 'react';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import './CreditBalancePage.css';

const CreditBalancePage = ({ onViewSubUsers }) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toast, setToast] = useState(null);
  const [commissionUser, setCommissionUser] = useState(null);
  const [creditLocked, setCreditLocked] = useState({});

  const dismissToast = useCallback(() => setToast(null), []);

  const mockData = [
    { id: '1', name: 'AdDeer001', username: 'AdDeer001', cp: 'Commi 0% 0% 15% 0% 0% 0% 15% 0%', totalLimit: '1,500,000.00' },
    { id: '2', name: 'Test AD', username: 'Adtest001', cp: 'Commi 15% 0%', totalLimit: '0.00' },
    { id: '3', name: 'Test Ad 2', username: 'Adtest002', cp: 'Commi 15% 15% 15%', totalLimit: '500,000.00' },
    { id: '4', name: 'lionad', username: 'lionad', cp: 'Commi 15% 15%', totalLimit: '500,000.00' },
  ];

  const isLocked = (row) => creditLocked[row.id] === true;

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'cp', label: 'C/P', sortable: true },
    { key: 'totalLimit', label: 'Total limit', sortable: true },
  ];

  const actions = [
    {
      icon: 'search-action',
      onClick: (row) => onViewSubUsers?.(row),
    },
    {
      icon: 'lock-action',
      onClick: (row) => {
        setCreditLocked((p) => {
          const next = !(p[row.id] === true);
          setToast(next ? 'User locked.' : 'User unlocked.');
          return { ...p, [row.id]: next };
        });
      },
      className: (row) => (isLocked(row) ? 'icon-button--state-off' : ''),
    },
    {
      icon: 'percent-action',
      onClick: (row) => setCommissionUser(row),
    },
  ];

  const stats = [
    { label: 'Total credit limit', value: '2,500,000.00' },
    { label: 'Total available', value: '1,850,000.00' },
    { label: 'Total used', value: '650,000.00' },
    { label: 'Total locked', value: '0' },
  ];

  return (
    <div className="credit-balance-page">
      {toast && <Toast message={toast} onDismiss={dismissToast} />}
      {commissionUser && (
        <Modal title="Commission parameters" onClose={() => setCommissionUser(null)}>
          <p className="credit-balance-page__modal-user">{commissionUser.username}</p>
          <p className="credit-balance-page__modal-hint">
            Adjust partnership and commission rules for this user in credit context.
          </p>
        </Modal>
      )}
      <Header
        searchValue={searchValue}
        onSearch={(e) => setSearchValue(e.target.value)}
        showAddButton={false}
      />
      <div className="credit-balance-page__content">
        <div className="credit-balance-page__content-top">
          <TableToolbar
            title="Credit balance"
            stats={stats}
            icon="credit-balance-sidebar.png"
          />
          <Table columns={columns} data={mockData} actions={actions} />
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

export default CreditBalancePage;
