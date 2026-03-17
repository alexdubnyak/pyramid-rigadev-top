import IconButton from '../common/IconButton';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, rowsPerPage, onRowsPerPageChange }) => {
  return (
    <div className="pagination">
      <div className="pagination__rows">
        <span>Rows per page:</span>
        <select 
          value={rowsPerPage} 
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="pagination__select"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      
      <div className="pagination__info">
        {currentPage} of {totalPages}
      </div>
      
      <div className="pagination__controls">
        <IconButton 
          icon="chevron-left" 
          onClick={() => onPageChange(currentPage - 1)}
        />
        <IconButton 
          icon="chevron-right" 
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Pagination;
