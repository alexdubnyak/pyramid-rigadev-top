import { useState } from 'react';
import Button from '../components/common/Button';
import './SettingsPage.css';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <div className="settings-page">
      <section className="settings-page__card">
        <h2 className="settings-page__card-title">Change Password</h2>
        <div className="settings-page__fields">
          <div className="settings-page__field">
            <label htmlFor="old-pw">Old password</label>
            <input
              id="old-pw"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="settings-page__field">
            <label htmlFor="new-pw">New password</label>
            <input
              id="new-pw"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="settings-page__field">
            <label htmlFor="repeat-pw">New password repeat</label>
            <input
              id="repeat-pw"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>
        <Button variant="primary">CHANGE PASSWORD</Button>
      </section>

      <section className="settings-page__card">
        <h2 className="settings-page__card-title">Multi‑Factor Authentication</h2>
        <p className="settings-page__hint">
          Connect Telegram to use it as a second factor for signing in.
        </p>
        <Button variant="secondary">CONNECT TELEGRAM</Button>
      </section>
    </div>
  );
};

export default SettingsPage;
