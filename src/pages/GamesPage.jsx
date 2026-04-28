import { useState } from 'react';
import Header from '../components/layout/Header';
import TableToolbar from '../components/table/TableToolbar';
import Table from '../components/table/Table';
import Pagination from '../components/table/Pagination';
import Button from '../components/common/Button';
import IconButton from '../components/common/IconButton';
import Modal from '../components/common/Modal';
import './GamesPage.css';

const GamesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tab, setTab] = useState('games');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modal, setModal] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [renameTarget, setRenameTarget] = useState(null);

  const gamesRows = [
    {
      name: 'Riga Lottery',
      description: 'Main lottery',
      gameUrl: '/lottery',
      releaseDate: '01/01/2025',
      order: '1',
    },
  ];

  const groupRows = [
    { name: 'Triple chance', games: 'Triple A, Triple B' },
    { name: 'Yantra Group', games: 'Yantra Classic' },
  ];

  const gameColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'gameUrl', label: 'Game URL', sortable: true },
    { key: 'releaseDate', label: 'Release Date', sortable: true },
    { key: 'order', label: 'Order', sortable: true },
    {
      key: 'edit',
      label: 'Actions',
      sortable: false,
      render: () => (
        <Button variant="secondary" size="sm" type="button">
          Edit
        </Button>
      ),
    },
  ];

  const groupColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'games', label: 'Games', sortable: true },
    {
      key: 'rowActions',
      label: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="games-page__row-actions">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => {
              setRenameTarget(row);
              setNewGroupName(row.name);
              setModal('rename-group');
            }}
          >
            Modify name
          </Button>
          <Button variant="secondary" size="sm" type="button" onClick={() => setModal('assign-games')}>
            Modify games
          </Button>
          <Button variant="secondary" size="sm" type="button">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const activeRows = tab === 'games' ? gamesRows : groupRows;
  const totalPages = Math.max(1, Math.ceil(activeRows.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstRowIndex = (safeCurrentPage - 1) * rowsPerPage;
  const paginatedRows = activeRows.slice(firstRowIndex, firstRowIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    setCurrentPage(1);
  };

  return (
    <div className="games-page">
      <Header searchValue={searchValue} onSearch={(e) => setSearchValue(e.target.value)} showAddButton={false} />
      <div className="games-page__tabs">
        <button
          type="button"
          className={`games-page__tab ${tab === 'games' ? 'games-page__tab--active' : ''}`}
          onClick={() => handleTabChange('games')}
        >
          GAMES
        </button>
        <button
          type="button"
          className={`games-page__tab ${tab === 'groups' ? 'games-page__tab--active' : ''}`}
          onClick={() => handleTabChange('groups')}
        >
          GROUPS
        </button>
      </div>

      {tab === 'games' && (
        <>
          <div className="games-page__actions">
            <Button variant="secondary" size="sm" type="button">Request more Games</Button>
          </div>
          <TableToolbar title="Games" stats={[]} icon="games-sidebar.png" />
          <Table columns={gameColumns} data={paginatedRows} />
        </>
      )}

      {tab === 'groups' && (
        <>
          <div className="games-page__actions games-page__actions--split">
            <Button variant="secondary" size="sm" type="button" onClick={() => setModal('create-group')}>
              Create new game group
            </Button>
            <div className="games-page__table-tools">
              <IconButton icon="search" />
              <IconButton icon="filter" />
            </div>
          </div>
          <TableToolbar title="Game groups" stats={[]} icon="games-sidebar.png" />
          <Table columns={groupColumns} data={paginatedRows} />
        </>
      )}

      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {modal === 'create-group' && (
        <Modal
          title="Create new Game Group"
          onClose={() => setModal(null)}
          primaryLabel="Save"
          onPrimary={() => setModal(null)}
        >
          <div className="modal__field">
            <label htmlFor="gname">Group name</label>
            <input
              id="gname"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <p className="games-page__hint">Games list (multi-select)</p>
          <ul className="games-page__checklist">
            <li>
              <label>
                <input type="checkbox" /> Riga Lottery
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" /> Yantra Classic
              </label>
            </li>
          </ul>
        </Modal>
      )}

      {modal === 'rename-group' && (
        <Modal
          title="Change name"
          onClose={() => {
            setModal(null);
            setRenameTarget(null);
          }}
          primaryLabel="Save"
          onPrimary={() => {
            setModal(null);
            setRenameTarget(null);
          }}
        >
          {renameTarget && (
            <p className="games-page__hint">Group: {renameTarget.name}</p>
          )}
          <div className="modal__field">
            <label htmlFor="newname">New name</label>
            <input
              id="newname"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>
        </Modal>
      )}

      {modal === 'assign-games' && (
        <Modal
          title="Assign games"
          onClose={() => setModal(null)}
          primaryLabel="Save"
          onPrimary={() => setModal(null)}
        >
          <ul className="games-page__checklist">
            <li>
              <label>
                <input type="checkbox" /> Riga Lottery
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" /> Yantra Classic
              </label>
            </li>
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default GamesPage;
