import IconButton from '../common/IconButton';
import './TableToolbar.css';

const TableToolbar = ({ stats, title }) => {
  return (
    <div className="table-toolbar">
      <div className="table-toolbar__title">{title}</div>
      <div className="table-toolbar__stats">
        {stats.map((stat, index) => (
          <span key={index} className="table-toolbar__stat">
            {stat.label}: <strong>{stat.value}</strong>
          </span>
        ))}
      </div>
      <div className="table-toolbar__actions">
        <IconButton icon="search" />
        <IconButton icon="filter" />
        <IconButton icon="view-column" />
        <IconButton icon="density-medium" />
        <IconButton icon="fullscreen" />
      </div>
    </div>
  );
};

export default TableToolbar;
