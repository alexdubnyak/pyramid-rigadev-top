import { useState } from 'react';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import IconButton from '../components/common/IconButton';
import Modal from '../components/common/Modal';
import './OperatorsPage.css';

const PERMISSION_LABELS = [
  'Pyramid login',
  'New circle',
  'Dear Lottery',
  'Triple game',
  'Settings',
  'Yantra game',
  'Scratch',
  'Digit lottery',
];

const OperatorsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modal, setModal] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [permState, setPermState] = useState(() =>
    PERMISSION_LABELS.reduce((a, x) => {
      a[x] = true;
      return a;
    }, {})
  );

  const [newOp, setNewOp] = useState({ name: '', username: '', password: '' });
  const [newPw, setNewPw] = useState({ a: '', b: '' });

  const mockRows = [
    { name: 'Operator One', username: 'op1', permissions: 'Pyramid login, Settings' },
    { name: 'Operator Two', username: 'op2', permissions: 'Pyramid login, Yantra game' },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'permissions', label: 'Permissions', sortable: true },
  ];

  const actions = [
    {
      icon: 'badge-action',
      onClick: (row) => {
        setSelectedRow(row);
        setModal('edit-permissions');
      },
    },
    {
      icon: 'key-action',
      onClick: (row) => {
        setSelectedRow(row);
        setModal('change-password');
      },
    },
  ];

  const totalPages = Math.max(1, Math.ceil(mockRows.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstRowIndex = (safeCurrentPage - 1) * rowsPerPage;
  const paginatedRows = mockRows.slice(firstRowIndex, firstRowIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="operators-page">
      <Header
        searchValue={searchValue}
        onSearch={(e) => setSearchValue(e.target.value)}
        showAddButton
        onAddClick={() => setModal('add')}
        addButtonLabel="Add Operator"
        stacked
        buttonSize="small"
      />
      <div className="operators-page__content">
        <div className="operators-page__content-top">
          <TableToolbar title="Operators" stats={[]} icon="operator-sidebar.png" />
          <Table columns={columns} data={paginatedRows} actions={actions} />
        </div>
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>

      {modal === 'add' && (
        <Modal
          title="Add Operator"
          onClose={() => setModal(null)}
          primaryLabel="CREATE"
          onPrimary={() => setModal(null)}
        >
          <div className="modal__field">
            <label htmlFor="op-name">Name</label>
            <input
              id="op-name"
              value={newOp.name}
              onChange={(e) => setNewOp((s) => ({ ...s, name: e.target.value }))}
            />
          </div>
          <div className="modal__field">
            <label htmlFor="op-user">Username</label>
            <input
              id="op-user"
              value={newOp.username}
              onChange={(e) => setNewOp((s) => ({ ...s, username: e.target.value }))}
            />
          </div>
          <div className="modal__field">
            <label htmlFor="op-pw">Password</label>
            <input
              id="op-pw"
              type="password"
              value={newOp.password}
              onChange={(e) => setNewOp((s) => ({ ...s, password: e.target.value }))}
            />
          </div>
        </Modal>
      )}

      {modal === 'edit-permissions' && (
        <Modal
          title="Edit operator permissions"
          onClose={() => setModal(null)}
          primaryLabel="UPDATE"
          onPrimary={() => setModal(null)}
        >
          {selectedRow && (
            <p className="operators-page__modal-sub">
              {selectedRow.username}
            </p>
          )}
          <ul className="operators-page__perm-list">
            {PERMISSION_LABELS.map((label) => (
              <li key={label}>
                <label className="operators-page__perm-label">
                  <input
                    type="checkbox"
                    checked={!!permState[label]}
                    onChange={() =>
                      setPermState((s) => ({ ...s, [label]: !s[label] }))
                    }
                  />
                  <span>{label}</span>
                </label>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {modal === 'change-password' && (
        <Modal
          title="Change operator password"
          onClose={() => setModal(null)}
          primaryLabel="SAVE"
          onPrimary={() => setModal(null)}
        >
          {selectedRow && (
            <p className="operators-page__modal-sub">
              {selectedRow.username}
            </p>
          )}
          <div className="modal__field">
            <label htmlFor="npw">New password</label>
            <input
              id="npw"
              type="password"
              value={newPw.a}
              onChange={(e) => setNewPw((s) => ({ ...s, a: e.target.value }))}
            />
          </div>
          <div className="modal__field">
            <label htmlFor="npw2">Confirm new password</label>
            <input
              id="npw2"
              type="password"
              value={newPw.b}
              onChange={(e) => setNewPw((s) => ({ ...s, b: e.target.value }))}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OperatorsPage;
