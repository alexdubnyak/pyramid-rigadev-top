import IconButton from '../common/IconButton';
import { getAssetPath } from '../../utils/getAssetPath';
import './TableToolbar.css';

const TableToolbar = ({ stats, title, icon, children }) => {
  return (
    <div className="table-toolbar">
      <div className="table-toolbar__title">
        {icon && (
          <img
            src={getAssetPath(icon)}
            alt=""
            className="table-toolbar__title-icon"
          />
        )}
        <span>{title}</span>
      </div>
      {children && (
        <div className="table-toolbar__extra">
          {children}
        </div>
      )}
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
