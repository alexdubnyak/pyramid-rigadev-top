import { useState } from 'react';
import IconButton from '../components/common/IconButton';
import { getAssetPath } from '../utils/getAssetPath';
import './PermissionsPage.css';

const GROUPS = [
  'Pyramid login',
  'New circle',
  'Dear Lottery',
  'Triple game',
  'Settings',
  'Yantra game',
  'Scratch',
  'Digit lottery',
];

const PermissionsPage = () => {
  const [granted, setGranted] = useState(() =>
    GROUPS.reduce((acc, g) => {
      acc[g] = true;
      return acc;
    }, {})
  );
  const [expanded, setExpanded] = useState(() => new Set());

  const toggle = (name) => {
    setGranted((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleExpand = (name) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="permissions-page">
      <div className="permissions-page__header">
        <h1 className="permissions-page__title">
          <img
            src={getAssetPath('permissions-sidebar.png')}
            alt=""
            className="permissions-page__title-icon"
          />
          <span>Permissions</span>
        </h1>
        <IconButton icon="add" className="permissions-page__add-group" />
      </div>
      <ul className="permissions-page__tree">
        {GROUPS.map((name) => (
          <li key={name} className="permissions-page__node">
            <button
              type="button"
              className={`permissions-page__expand ${expanded.has(name) ? 'permissions-page__expand--open' : ''}`}
              aria-expanded={expanded.has(name)}
              aria-label={expanded.has(name) ? 'Collapse' : 'Expand'}
              onClick={() => toggleExpand(name)}
            >
              ▶
            </button>
            <label className="permissions-page__label">
              <input
                type="checkbox"
                checked={!!granted[name]}
                onChange={() => toggle(name)}
              />
              <span>{name}</span>
            </label>
            {expanded.has(name) && (
              <div className="permissions-page__nested">
                <span className="permissions-page__nested-hint">Sub-permissions (example)</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionsPage;
