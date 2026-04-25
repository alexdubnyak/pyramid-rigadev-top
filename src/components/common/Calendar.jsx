import { useState, useMemo } from 'react';
import './Calendar.css';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const parseISO = (value) => {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const toISO = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const isSameDate = (a, b) =>
  a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const Calendar = ({ value, onSelect }) => {
  const selected = parseISO(value);
  const today = new Date();
  const initial = selected ?? today;
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const cells = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    // Monday-first: shift Sunday (0) to 6, others -1
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
    const start = new Date(viewYear, viewMonth, 1 - firstWeekday);
    const result = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      result.push(d);
    }
    return result;
  }, [viewYear, viewMonth]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelect = (date) => {
    onSelect(toISO(date));
  };

  return (
    <div className="calendar" role="dialog" aria-label="Choose date">
      <div className="calendar__header">
        <button
          type="button"
          className="calendar__nav"
          onClick={goPrev}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="calendar__title">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className="calendar__nav"
          onClick={goNext}
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div className="calendar__weekdays">
        {WEEKDAYS.map((w) => (
          <span key={w} className="calendar__weekday">{w}</span>
        ))}
      </div>
      <div className="calendar__grid">
        {cells.map((date) => {
          const inMonth = date.getMonth() === viewMonth;
          const isSelected = isSameDate(date, selected);
          const isToday = isSameDate(date, today);
          const className = [
            'calendar__day',
            !inMonth && 'calendar__day--out',
            isSelected && 'calendar__day--selected',
            isToday && !isSelected && 'calendar__day--today',
          ].filter(Boolean).join(' ');
          return (
            <button
              key={date.toISOString()}
              type="button"
              className={className}
              onClick={() => handleSelect(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
