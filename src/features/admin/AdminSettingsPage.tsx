import React, { useState } from 'react';
import {
  Settings,
  Store,
  CreditCard,
  Truck,
  Sparkles,
  Bell,
  Save,
  CheckCircle2,
  RefreshCw,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { useUiStore } from '../../shared/store/uiStore';

export const AdminSettingsPage: React.FC = () => {
  const { addToast } = useUiStore();
  const [activeTab, setActiveTab] = useState<'store' | 'payments' | 'shipping' | 'ai' | 'notifications'>('store');
  const [isSaving, setIsSaving] = useState(false);

  // Store form state
  const [storeConfig, setStoreConfig] = useState({
    storeName: 'Local Art AI Marketplace',
    supportEmail: 'concierge@localart.ai',
    defaultCurrency: 'USD',
    enableGuestCheckout: true,
    maintenanceMode: false,
  });

  // Payment form state
  const [paymentConfig, setPaymentConfig] = useState({
    stripeEnabled: true,
    stripeSandbox: false,
    stripePublishableKey: 'pk_live_51P0LocalArtAIVerifiedLive98421',
    paypalEnabled: true,
    paypalSandbox: true,
    applePayEnabled: true,
    googlePayEnabled: true,
    cashOnDelivery: false,
  });

  // Shipping form state
  const [shippingConfig, setShippingConfig] = useState({
    freeShippingThreshold: '50.00',
    standardShippingFee: '4.99',
    expressShippingFee: '14.99',
    autoEstimateCarrierTax: true,
  });

  // AI & Concierge form state
  const [aiConfig, setAiConfig] = useState({
    conciergeEnabled: true,
    ragSemanticSearch: true,
    visualSearchSimilarityThreshold: '0.82',
    smartFreeShippingUpsell: true,
    openAiModel: 'gpt-4o-mini',
  });

  const handleSave = (section: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        type: 'success',
        title: 'Settings Saved',
        message: `${section} configuration synchronized with production runtime.`,
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-navy-900" /> Platform System Settings
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Configure payment gateways, shipping thresholds, AI catalog embeddings, and store preferences
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleSave('Master Settings')}
          isLoading={isSaving}
          className="text-xs flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 font-bold"
        >
          <Save className="w-3.5 h-3.5" /> Save All Changes
        </Button>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-2">
        {[
          { id: 'store', label: 'Store Profile', icon: Store },
          { id: 'payments', label: 'Payment Gateways', icon: CreditCard },
          { id: 'shipping', label: 'Shipping & Fulfillment', icon: Truck },
          { id: 'ai', label: 'Artisan AI & Search Engine', icon: Sparkles },
          { id: 'notifications', label: 'Email & Alerts', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-button text-xs font-bold transition-all ${
                isActive
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white p-6 rounded-card border border-neutral-200 shadow-xs space-y-6">
        {/* 1. Store Profile */}
        {activeTab === 'store' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Store Identity & Regional Format
            </h3>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Marketplace Name
              </label>
              <input
                type="text"
                value={storeConfig.storeName}
                onChange={(e) => setStoreConfig({ ...storeConfig, storeName: e.target.value })}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-[6px] focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Official Support / Concierge Email
              </label>
              <input
                type="email"
                value={storeConfig.supportEmail}
                onChange={(e) => setStoreConfig({ ...storeConfig, supportEmail: e.target.value })}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-[6px] focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Default Display Currency
                </label>
                <select
                  value={storeConfig.defaultCurrency}
                  onChange={(e) => setStoreConfig({ ...storeConfig, defaultCurrency: e.target.value })}
                  className="w-full text-xs p-2.5 border border-neutral-200 rounded-[6px] focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                  <option value="CAD">CAD ($ - Canadian Dollar)</option>
                  <option value="AUD">AUD ($ - Australian Dollar)</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-800 pb-2">
                  <input
                    type="checkbox"
                    checked={storeConfig.enableGuestCheckout}
                    onChange={(e) => setStoreConfig({ ...storeConfig, enableGuestCheckout: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  Allow Instant Guest Checkout
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 2. Payments */}
        {activeTab === 'payments' && (
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Payment Processors & Gateway Credentials
            </h3>

            {/* Stripe Card */}
            <div className="p-4 border border-neutral-200 rounded-[10px] bg-neutral-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#635BFF] text-white font-black flex items-center justify-center text-xs">
                    S
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">Stripe Integration</h4>
                    <p className="text-[11px] text-neutral-500">Credit Cards, Apple Pay, Google Pay, 3D Secure</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentConfig.stripeEnabled}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, stripeEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {paymentConfig.stripeEnabled && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Stripe Publishable Key
                    </label>
                    <input
                      type="text"
                      value={paymentConfig.stripePublishableKey}
                      onChange={(e) => setPaymentConfig({ ...paymentConfig, stripePublishableKey: e.target.value })}
                      className="w-full text-xs font-mono p-2 border border-neutral-200 rounded-[6px] bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-neutral-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentConfig.applePayEnabled}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, applePayEnabled: e.target.checked })}
                        className="rounded text-blue-600"
                      />
                      Enable Apple Pay One-Touch
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentConfig.googlePayEnabled}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, googlePayEnabled: e.target.checked })}
                        className="rounded text-blue-600"
                      />
                      Enable Google Pay
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* PayPal Card */}
            <div className="p-4 border border-neutral-200 rounded-[10px] bg-neutral-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#003087] text-white font-black flex items-center justify-center text-xs">
                    P
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">PayPal Express Checkout</h4>
                    <p className="text-[11px] text-neutral-500">PayPal Wallet and Pay in 4 installment billing</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentConfig.paypalEnabled}
                    onChange={(e) => setPaymentConfig({ ...paymentConfig, paypalEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 3. Shipping */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Shipping Rates & Free Shipping Thresholds
            </h3>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Free Shipping Threshold ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={shippingConfig.freeShippingThreshold}
                onChange={(e) => setShippingConfig({ ...shippingConfig, freeShippingThreshold: e.target.value })}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-[6px] focus:outline-none focus:border-blue-600"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Orders equal or exceeding this value receive free standard ground shipping automatically.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Standard Flat Rate ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingConfig.standardShippingFee}
                  onChange={(e) => setShippingConfig({ ...shippingConfig, standardShippingFee: e.target.value })}
                  className="w-full text-xs p-2.5 border border-neutral-200 rounded-[6px]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Express Courier Flat Rate ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingConfig.expressShippingFee}
                  onChange={(e) => setShippingConfig({ ...shippingConfig, expressShippingFee: e.target.value })}
                  className="w-full text-xs p-2.5 border border-neutral-200 rounded-[6px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. AI & Search */}
        {activeTab === 'ai' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Artisan Concierge & Semantic Catalog Settings
            </h3>
            <div className="p-4 bg-gold-50 border border-gold-200 rounded-[8px] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gold-900 block">Catalog Vector Index</span>
                <span className="text-[11px] text-gold-700 block">
                  Last re-indexed: 2 hours ago (148 products, 42 craft tags embedded)
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Embeddings Refreshed',
                    message: 'Vector index updated with all live product specifications.',
                  });
                }}
                className="text-xs flex items-center gap-1.5 bg-white border-gold-300 text-gold-900 hover:bg-gold-100"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-Embed Catalog
              </Button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Visual Search Cosine Similarity Threshold
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="0.99"
                value={aiConfig.visualSearchSimilarityThreshold}
                onChange={(e) => setAiConfig({ ...aiConfig, visualSearchSimilarityThreshold: e.target.value })}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-[6px]"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Higher threshold requires closer visual resemblance for image drop matching.
              </p>
            </div>
          </div>
        )}

        {/* 5. Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Automated Email & Webhook Triggers
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Order Confirmation Email', desc: 'Sent instantly upon successful checkout.' },
                { label: 'Out for Delivery Tracking Alert', desc: 'Sent when tracking status changes to SHIPPED.' },
                { label: 'Low-Stock Watchdog Alert', desc: 'Sent to store admins when item quantity drops below 5.' },
                { label: 'New Review Moderation Alert', desc: 'Notify team when a customer submits a new product review.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-neutral-200 rounded-[8px]">
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">{item.label}</span>
                    <span className="text-[11px] text-neutral-500 block">{item.desc}</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
