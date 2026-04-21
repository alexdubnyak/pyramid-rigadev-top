import { useCallback, useState } from 'react';
import Icon from '../components/common/Icon';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import './UsersPage.css';

const MOCK_MAIN = [
  { id: '1', name: 'AdDeer001', username: 'AdDeer001', cp: 'Commi 0% 0% 15% 0% 0% 0% 15% 0%' },
  { id: '2', name: 'Test AD', username: 'Adtest001', cp: 'Commi 15% 0%' },
  { id: '3', name: 'Test Ad 2', username: 'Adtest002', cp: 'Commi 15% 15% 15%' },
  { id: '4', name: 'lionad', username: 'lionad', cp: 'Commi 15% 15%' },
];

const MOCK_SUB = [
  { id: 's1', name: 'SubUser01', username: 'sub01', cp: 'Commi 10% 0%' },
  { id: 's2', name: 'SubUser02', username: 'sub02', cp: 'Commi 10% 10%' },
];

const UsersPage = ({
  mode = 'list',
  parentUser = null,
  backLabel = 'Users',
  onBack,
  onViewSubUsers,
  onAddClick,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [modalUser, setModalUser] = useState(null);
  const [loginEnabled, setLoginEnabled] = useState({});
  const [bettingEnabled, setBettingEnabled] = useState({});
  const [gameAlloc, setGameAlloc] = useState({});

  const data = mode === 'sub' ? MOCK_SUB : MOCK_MAIN;

  const dismissToast = useCallback(() => setToast(null), []);

  const isLoginOn = (row) => loginEnabled[row.id] !== false;
  const isBettingOn = (row) => bettingEnabled[row.id] !== false;

  const showHierarchy = (row) => {
    setModalUser(row);
    setModal('hierarchy');
  };

  const showManageGames = (row) => {
    setModalUser(row);
    setGameAlloc((prev) => ({
      ...prev,
      [row.id]: prev[row.id] ?? { riga: 1, yantra: 0, triple: 1 },
    }));
    setModal('games');
  };

  const toggleLogin = (row) => {
    const next = !isLoginOn(row);
    setLoginEnabled((p) => ({ ...p, [row.id]: next }));
    setToast(next ? 'Login enabled.' : 'Login disabled for this user.');
  };

  const toggleBetting = (row) => {
    const next = !isBettingOn(row);
    setBettingEnabled((p) => ({ ...p, [row.id]: next }));
    setToast(
      next
        ? 'User bets are enabled (including children).'
        : 'User bets are disabled (including children).'
    );
  };

  const bumpGame = (userId, key, delta) => {
    setGameAlloc((prev) => {
      const g = { ...(prev[userId] ?? { riga: 0, yantra: 0, triple: 0 }) };
      g[key] = Math.max(0, (g[key] ?? 0) + delta);
      return { ...prev, [userId]: g };
    });
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'cp', label: 'C/P', sortable: true },
  ];

  const actionsMain = [
    { icon: 'search-action', onClick: (row) => onViewSubUsers?.(row) },
    { icon: 'people-action', onClick: (row) => showHierarchy(row) },
    {
      icon: 'lock-action',
      onClick: (row) => toggleLogin(row),
      className: (row) => (isLoginOn(row) ? '' : 'icon-button--state-off'),
    },
    { icon: 'games-action', onClick: (row) => showManageGames(row) },
  ];

  const actionsSub = [
    { icon: 'search-action', onClick: (row) => onViewSubUsers?.(row) },
    { icon: 'people-action', onClick: (row) => showHierarchy(row) },
    {
      icon: 'lock-action',
      onClick: (row) => toggleLogin(row),
      className: (row) => (isLoginOn(row) ? '' : 'icon-button--state-off'),
    },
    {
      icon: 'games-action',
      onClick: (row) => toggleBetting(row),
      className: (row) => (isBettingOn(row) ? '' : 'icon-button--state-off'),
    },
  ];

  const stats = [
    { label: 'Total Settlement', value: '2124411.75' },
    { label: 'Total users', value: '0' },
    { label: 'Total users today', value: '0' },
    { label: 'Total users online', value: '0' },
  ];

  return (
    <div className="users-page">
      {toast && <Toast message={toast} onDismiss={dismissToast} />}
      {modal === 'hierarchy' && modalUser && (
        <Modal title="User hierarchy" onClose={() => setModal(null)}>
          <div className="users-page__tree">
            <ul>
              <li>
                <span className="users-page__tree-node">Company (root)</span>
                <ul>
                  <li>
                    <span className="users-page__tree-node">Area admin</span>
                    <ul>
                      <li>
                        <span className="users-page__tree-node users-page__tree-node--current">
                          {modalUser.name} ({modalUser.username})
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Modal>
      )}

      {modal === 'games' && modalUser && (
        <Modal
          title="Manage the selected user's games"
          onClose={() => setModal(null)}
          primaryLabel="UPDATE GAMES"
          onPrimary={() => {
            setToast('Games updated.');
            setModal(null);
          }}
        >
          <p className="users-page__modal-user">{modalUser.username}</p>
          {[
            { key: 'riga', label: 'Riga Lottery' },
            { key: 'yantra', label: 'Yantra' },
            { key: 'triple', label: 'Triple chance' },
          ].map(({ key, label }) => (
            <div key={key} className="users-page__game-row">
              <span>{label}</span>
              <div className="users-page__game-stepper">
                <button type="button" onClick={() => bumpGame(modalUser.id, key, -1)}>−</button>
                <span>{gameAlloc[modalUser.id]?.[key] ?? 0}</span>
                <button type="button" onClick={() => bumpGame(modalUser.id, key, 1)}>+</button>
              </div>
            </div>
          ))}
        </Modal>
      )}

      {mode === 'sub' && parentUser && (
        <div className="users-page__breadcrumb">
          <button type="button" className="users-page__back" onClick={onBack}>
            <Icon name="chevron-left" size="md" />
            <span>{backLabel}</span>
          </button>
          <span className="users-page__breadcrumb-sep">/</span>
          <span className="users-page__breadcrumb-current">{parentUser.name}</span>
        </div>
      )}
      <Header
        searchValue={searchValue}
        onSearch={(e) => setSearchValue(e.target.value)}
        showAddButton={mode === 'list'}
        onAddClick={onAddClick}
      />
      <TableToolbar title={mode === 'sub' ? 'Sub-users' : 'Users'} stats={stats} />
      <Table
        columns={columns}
        data={data}
        actions={mode === 'sub' ? actionsSub : actionsMain}
      />
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
