import React, { useState, useEffect } from 'react';
import './App.css';
import AppealsTable from './components/AppealsTable';
import Pagination from './components/Pagination';
import FilterPanel from './components/FilterPanel';
import AppealsMap from './components/AppealsMap';
import DetailModal from './components/DetailModal';

function App() {
  const [appeals, setAppeals] = useState([]);
  const [filteredAppeals, setFilteredAppeals] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setAppeals(data);
        setFilteredAppeals(data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
      });
  }, []);

  useEffect(() => {
    let filtered = [...appeals];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((appeal) => appeal.status === statusFilter);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (appeal) =>
          appeal.category.toLowerCase().includes(query) ||
          appeal.address.toLowerCase().includes(query)
      );
    }

    setFilteredAppeals(filtered);
    setCurrentPage(1);
  }, [statusFilter, searchQuery, appeals]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClick = (appeal) => {
    setSelectedAppeal(appeal);
    setIsModalOpen(true);
  };

  const handleMarkerClick = (appeal) => {
    setSelectedAppeal(appeal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppeal(null);
  };

  const totalPages = Math.ceil(filteredAppeals.length / itemsPerPage);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Система визуализации обращений граждан</h1>
      </header>

      <main className="app-main">
        <div className="app-container">
          <FilterPanel
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            onStatusChange={handleStatusChange}
            onSearchChange={handleSearchChange}
          />

          <div className="content-section">
            <div className="table-section">
              <h2>Список обращений</h2>
              <div className="results-info">
                Найдено обращений: {filteredAppeals.length}
              </div>
              <AppealsTable
                appeals={filteredAppeals}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onRowClick={handleRowClick}
              />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>

            <div className="map-section">
              <h2>Карта обращений</h2>
              <AppealsMap
                appeals={filteredAppeals}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </div>
      </main>

      <DetailModal
        appeal={selectedAppeal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
