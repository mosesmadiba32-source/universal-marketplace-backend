import React, { useState } from 'react';
import { Shield, Key, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setStatusMessage('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage('Passwords do not match.');
      return;
    }

    setStatusMessage('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-navy-900">Security & Credentials</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Update your login password and manage two-factor multi-device authentication
        </p>
      </div>

      {/* Change Password Card */}
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border">
          <Key className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold text-navy-900">Change Password</h3>
        </div>

        <form onSubmit={handleUpdatePassword} className="max-w-md space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">New Password (min 8 chars)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
            />
          </div>

          {statusMessage && (
            <p className={`text-xs font-semibold ${statusMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-5 py-2.5 rounded-btn text-xs transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication Card */}
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-gold-500" />
            <div>
              <h3 className="text-sm font-bold text-navy-900">Two-Factor Authentication (2FA)</h3>
              <p className="text-xs text-text-secondary">Protect your account with an extra security layer</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
          </label>
        </div>

        <p className="text-xs text-text-secondary">
          {twoFactorEnabled
            ? '✓ Two-factor authentication is active. An SMS or authenticator code is requested on each new device sign-in.'
            : 'Two-factor authentication is currently disabled. Enable to require authentication verification codes.'}
        </p>
      </div>
    </div>
  );
};
