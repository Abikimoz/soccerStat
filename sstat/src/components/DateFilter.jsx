import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Запускать фильтрацию только если обе даты заданы
    if (startDate && endDate) {
      onFilter({ startDate, endDate });
    }
    // Добавьте начальную и конечную дату в зависимости, чтобы избежать бесконечного цикла
  }, [startDate, endDate, onFilter]);

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (!endDate || new Date(newStartDate) <= new Date(endDate)) {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (!startDate || new Date(newEndDate) >= new Date(startDate)) {
      setEndDate(newEndDate);
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
