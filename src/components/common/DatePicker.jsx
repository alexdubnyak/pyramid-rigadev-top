import { useEffect, useRef, useState, useCallback } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';
import Calendar from './Calendar';
import './DatePicker.css';

const formatDisplay = (isoDate) => {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y.slice(2)}`;
};

const POPUP_OFFSET = 6;
const VIEWPORT_PADDING = 8;
const POPUP_WIDTH = 252;

const DatePicker = ({ label, value, onChange, labelBackground }) => {
  const buttonRef = useRef(null);
  const [popup, setPopup] = useState(null);

  const open = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let left = rect.left;
    const maxLeft = window.innerWidth - POPUP_WIDTH - VIEWPORT_PADDING;
    if (left > maxLeft) left = maxLeft;
    if (left < VIEWPORT_PADDING) left = VIEWPORT_PADDING;
    setPopup({
      top: rect.bottom + POPUP_OFFSET,
      left,
    });
  }, []);

  const close = useCallback(() => setPopup(null), []);

  const toggle = () => {
    if (popup) close();
    else open();
  };

  useEffect(() => {
    if (!popup) return;
    const handleDown = (e) => {
      const btn = buttonRef.current;
      const target = e.target;
      if (btn && btn.contains(target)) return;
      if (target.closest('.calendar')) return;
      close();
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [popup, close]);

  const handleSelect = (iso) => {
    onChange(iso);
    close();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`date-picker${popup ? ' date-picker--open' : ''}`}
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={!!popup}
      >
        <span
          className="date-picker__label"
          style={labelBackground ? { backgroundColor: labelBackground } : undefined}
        >
          {label}
        </span>
        <span className="date-picker__value">{formatDisplay(value)}</span>
        <img
          src={getAssetPath('calendar.svg')}
          alt=""
          className="date-picker__icon"
        />
      </button>
      {popup && (
        <div
          className="date-picker__popup"
          style={{ top: popup.top, left: popup.left }}
        >
          <Calendar value={value} onSelect={handleSelect} />
        </div>
      )}
    </>
  );
};

export default DatePicker;
