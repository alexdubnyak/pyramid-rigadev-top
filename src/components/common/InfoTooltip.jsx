import { useState, useRef, useCallback } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';
import './InfoTooltip.css';

const TOOLTIP_WIDTH = 280;
const TOOLTIP_OFFSET = 8;
const VIEWPORT_PADDING = 8;

const InfoTooltip = ({ text }) => {
  const iconRef = useRef(null);
  const [position, setPosition] = useState(null);

  const show = useCallback(() => {
    const el = iconRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    let left = iconCenterX - TOOLTIP_WIDTH / 2;
    const maxLeft = window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_PADDING;
    if (left < VIEWPORT_PADDING) left = VIEWPORT_PADDING;
    if (left > maxLeft) left = maxLeft;
    const arrowOffset = iconCenterX - left;
    setPosition({
      top: rect.bottom + TOOLTIP_OFFSET,
      left,
      arrowOffset,
    });
  }, []);

  const hide = useCallback(() => setPosition(null), []);

  return (
    <span
      ref={iconRef}
      className="info-tooltip"
      tabIndex={0}
      aria-label={text}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <img src={getAssetPath('info.svg')} alt="" />
      {position && (
        <span
          className="info-tooltip__bubble"
          role="tooltip"
          style={{
            top: position.top,
            left: position.left,
            width: TOOLTIP_WIDTH,
            '--arrow-offset': `${position.arrowOffset}px`,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default InfoTooltip;
