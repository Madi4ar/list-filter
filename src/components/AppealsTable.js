import React from 'react';
import './AppealsTable.css';

function AppealsTable({ appeals, currentPage, itemsPerPage, onRowClick }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppeals = appeals.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'В работе':
        return 'status-in-progress';
      case 'Решено':
        return 'status-resolved';
      case 'Отклонено':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="table-container">
      <table className="appeals-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Категория</th>
            <th>Адрес</th>
            <th>Статус</th>
            <th>Дата регистрации</th>
          </tr>
        </thead>
        <tbody>
          {currentAppeals.length > 0 ? (
            currentAppeals.map((appeal) => (
              <tr key={appeal.id} onClick={() => onRowClick(appeal)} className="table-row">
                <td>{appeal.id}</td>
                <td>{appeal.category}</td>
                <td>{appeal.address}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(appeal.status)}`}>
                    {appeal.status}
                  </span>
                </td>
                <td>{formatDate(appeal.created_at)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                Нет данных для отображения
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppealsTable;

