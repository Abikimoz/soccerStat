import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DateFilter = ({ startDate, endDate, onFilter, onStartDateChange, onEndDateChange }) => {
  
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    onStartDateChange(newStartDate);
    
    // Запуск фильтрации только если обе даты заданы
    if (newStartDate && endDate) {
      onFilter({ startDate: newStartDate, endDate });
    } else {
      onFilter({ startDate: '', endDate: '' }); // Сбрасываем фильтр, если одна из дат не задана
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    onEndDateChange(newEndDate);
    
    // Запуск фильтрации только если обе даты заданы
    if (startDate && newEndDate) {
      onFilter({ startDate, endDate: newEndDate });
    } else {
      onFilter({ startDate: '', endDate: '' }); // Сбрасываем фильтр, если одна из дат не задана
    }
  };

  return (
    <div className="mb-3">
      <h5>Матчи</h5>
      <div className="d-flex align-items-center">
        <div className="me-3 d-flex align-items-center">
          <label htmlFor="startDate" className="form-label mb-0">с</label>
          <input
            type="date"
            id="startDate"
            className="form-control ms-2"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="endDate" className="form-label mb-0">по</label>
          <input
            type="date"
            id="endDate"
            className="form-control ms-2"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
    </div>
  );
};
