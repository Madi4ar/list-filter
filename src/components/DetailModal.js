import React from 'react';
import './DetailModal.css';

function DetailModal({ appeal, isOpen, onClose }) {
  if (!isOpen || !appeal) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <h2>Детальная информация об обращении</h2>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-field">
              <label>ID:</label>
              <span>{appeal.id}</span>
            </div>
            
            <div className="modal-field">
              <label>Категория:</label>
              <span>{appeal.category}</span>
            </div>
            
            <div className="modal-field">
              <label>Адрес:</label>
              <span>{appeal.address}</span>
            </div>
            
            <div className="modal-field">
              <label>Статус:</label>
              <span className={`status-badge ${getStatusClass(appeal.status)}`}>
                {appeal.status}
              </span>
            </div>
            
            <div className="modal-field">
              <label>Дата регистрации:</label>
              <span>{formatDate(appeal.created_at)}</span>
            </div>
            
            <div className="modal-field full-width">
              <label>Описание:</label>
              <p>{appeal.description}</p>
            </div>
            
            <div className="modal-field full-width">
              <label>Координаты:</label>
              <p>Широта: {appeal.latitude}, Долгота: {appeal.longitude}</p>
            </div>

            {appeal.photo && (
              <div className="modal-field full-width">
                <label>Фото:</label>
                <div className="modal-photo">
                  <img src={appeal.photo} alt={appeal.category} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;

