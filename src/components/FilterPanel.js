import React from 'react';
import './FilterPanel.css';

function FilterPanel({ statusFilter, searchQuery, onStatusChange, onSearchChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="status-filter" className="filter-label">
          Фильтр по статусу:
        </label>
        <select
          id="status-filter"
          className="filter-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">Все статусы</option>
          <option value="В работе">В работе</option>
          <option value="Решено">Решено</option>
          <option value="Отклонено">Отклонено</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-input" className="filter-label">
          Поиск:
        </label>
        <input
          id="search-input"
          type="text"
          className="filter-input"
          placeholder="Поиск по категории или адресу..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FilterPanel;

