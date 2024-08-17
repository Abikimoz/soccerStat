import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Запуск фильтрации только если обе даты заданы
    if (startDate && endDate) {
      onFilter({ startDate, endDate });
    } else {
      // Если хотя бы одна дата не задана, очищаем фильтр
      onFilter({ startDate: '', endDate: '' });
    }
  }, [startDate, endDate, onFilter]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
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
