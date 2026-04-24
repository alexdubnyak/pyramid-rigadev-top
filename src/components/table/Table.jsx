import IconButton from '../common/IconButton';
import './Table.css';

const Table = ({ columns, data, actions, rowClassName, onRowClick }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="table__header">
                <div className="table__header-content">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <IconButton icon="arrow-down" size="sm" />
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="table__header">Actions</th>}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={['table__row', onRowClick ? 'table__row--clickable' : '', rowClassName?.(row, rowIndex)]
                .filter(Boolean)
                .join(' ')}
              onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="table__cell">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="table__cell table__cell--actions">
                  <div className="table__actions">
                    {actions.map((action, actionIndex) => (
                      <IconButton
                        key={actionIndex}
                        icon={action.icon}
                        onClick={() => action.onClick(row)}
                        className={
                          typeof action.className === 'function'
                            ? action.className(row)
                            : action.className || ''
                        }
                      />
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
