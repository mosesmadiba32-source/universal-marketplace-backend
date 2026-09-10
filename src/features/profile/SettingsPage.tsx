import React, { useState } from 'react';
import { Settings, Globe, Moon, Bell, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-navy-900">Account Preferences & Settings</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Customize currency displays, regional language preferences, and alert frequencies
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Preferred Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600 bg-surface"
            >
              <option value="USD">USD ($) — United States Dollar</option>
              <option value="EUR">EUR (€) — Euro</option>
              <option value="GBP">GBP (£) — British Pound</option>
              <option value="CAD">CAD ($) — Canadian Dollar</option>
              <option value="AUD">AUD ($) — Australian Dollar</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Display Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600 bg-surface"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Email Communications</h4>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-xs text-text-primary">
              Receive order tracking updates, dispatch notices, and delivery confirmation emails
            </span>
          </label>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-green-50 text-green-700 text-xs font-semibold rounded-md flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Preferences saved successfully!</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-2.5 rounded-btn text-xs transition-colors shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
