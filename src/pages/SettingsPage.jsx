import { useState } from 'react';
import TableToolbar from '../components/table/TableToolbar';
import Button from '../components/common/Button';
import './SettingsPage.css';

const MFA_MESSAGE = 'mri:mohnrgdjec2a10be';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const canChangePassword =
    oldPassword.length > 0 && newPassword.length > 0 && newPassword === repeatPassword;

  return (
    <div className="settings-page">
      <div className="settings-page__panel">
        <TableToolbar title="Settings" stats={[]} icon="settings-sidebar.png" hideActions />

        <div className="settings-page__body">
          <section className="settings-page__column" aria-labelledby="settings-change-password">
            <h2 id="settings-change-password" className="settings-page__column-title">
              Change password
            </h2>

            <div className="settings-page__floating-field">
              <label htmlFor="settings-old-password" className="settings-page__floating-label">
                Old password
              </label>
              <input
                id="settings-old-password"
                className="settings-page__floating-input"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="settings-page__floating-field">
              <label htmlFor="settings-new-password" className="settings-page__floating-label">
                New password
              </label>
              <input
                id="settings-new-password"
                className="settings-page__floating-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="settings-page__floating-field">
              <label htmlFor="settings-repeat-password" className="settings-page__floating-label">
                New password repeat
              </label>
              <input
                id="settings-repeat-password"
                className="settings-page__floating-input"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <Button
              variant="accent"
              size="small"
              className="settings-page__action settings-page__action--full"
              disabled={!canChangePassword}
            >
              Change Password
            </Button>
          </section>

          <section className="settings-page__column" aria-labelledby="settings-mfa">
            <h2 id="settings-mfa" className="settings-page__column-title">
              Multi‑Factor Authentication
            </h2>

            <div className="settings-page__floating-field">
              <span className="settings-page__floating-label">Send this message</span>
              <div className="settings-page__floating-value">{MFA_MESSAGE}</div>
            </div>

            <div className="settings-page__action-row">
              <Button variant="accent" size="small" className="settings-page__action">
                Open Telegram Chat
              </Button>
              <Button variant="accent" size="small" className="settings-page__action">
                Manual Refresh
              </Button>
            </div>

            <Button
              variant="accent"
              size="small"
              className="settings-page__action settings-page__action--full"
              disabled
            >
              Connecting...
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
