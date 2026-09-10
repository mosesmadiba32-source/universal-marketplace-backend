import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-6 select-none">
      <h1 className="text-3xl font-extrabold text-navy-900">Privacy Policy</h1>
      <p className="text-xs text-text-secondary">Last updated: September 10, 2026</p>

      <div className="bg-surface rounded-[12px] border border-border p-8 shadow-sm text-xs text-text-secondary space-y-4 leading-relaxed">
        <h3 className="text-sm font-bold text-navy-900">1. Information We Collect</h3>
        <p>
          We collect personal information that you provide to us directly when registering an account, placing an order, subscribing to our newsletter, or contacting customer support. This includes name, email, shipping address, and payment information handled securely via PCI-compliant gateways.
        </p>

        <h3 className="text-sm font-bold text-navy-900">2. How We Use Your Information</h3>
        <p>
          Your information is utilized exclusively to process transactions, deliver orders, communicate order updates, personalize catalog recommendations, and maintain the integrity and security of our marketplace.
        </p>

        <h3 className="text-sm font-bold text-navy-900">3. Data Security</h3>
        <p>
          We employ 256-bit SSL encryption, tokenized payment processing, and rigorous role-based access controls to safeguard your data at rest and in transit.
        </p>
      </div>
    </div>
  );
};

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-6 select-none">
      <h1 className="text-3xl font-extrabold text-navy-900">Terms of Service</h1>
      <p className="text-xs text-text-secondary">Effective Date: September 10, 2026</p>

      <div className="bg-surface rounded-[12px] border border-border p-8 shadow-sm text-xs text-text-secondary space-y-4 leading-relaxed">
        <h3 className="text-sm font-bold text-navy-900">1. Acceptance of Terms</h3>
        <p>
          By accessing or using the Local Art AI platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>

        <h3 className="text-sm font-bold text-navy-900">2. Marketplace Purchases & Authenticity</h3>
        <p>
          All products offered on Local Art AI are guaranteed authentic and certified according to their listed specifications. Orders are subject to verification and product availability.
        </p>

        <h3 className="text-sm font-bold text-navy-900">3. Intellectual Property</h3>
        <p>
          All trademarks, logos, artwork, software, and brand assets displayed on Local Art AI are the proprietary property of Local Art AI and its licensed partners.
        </p>
      </div>
    </div>
  );
};

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-6 select-none">
      <h1 className="text-3xl font-extrabold text-navy-900">Cookie Policy</h1>
      <p className="text-xs text-text-secondary">Last updated: September 10, 2026</p>

      <div className="bg-surface rounded-[12px] border border-border p-8 shadow-sm text-xs text-text-secondary space-y-4 leading-relaxed">
        <h3 className="text-sm font-bold text-navy-900">What are Cookies?</h3>
        <p>
          Cookies are small text files stored on your device that enable our platform to remember your cart items, active sessions, currency preferences, and interface customizations.
        </p>
        <h3 className="text-sm font-bold text-navy-900">Managing Cookies</h3>
        <p>
          You can modify your browser settings to decline non-essential cookies. Please note that essential cookies are required for cart persistence and secure checkout.
        </p>
      </div>
    </div>
  );
};

export const AccessibilityPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-6 select-none">
      <h1 className="text-3xl font-extrabold text-navy-900">Accessibility Statement</h1>
      <p className="text-xs text-text-secondary">Committed to Digital Inclusion</p>

      <div className="bg-surface rounded-[12px] border border-border p-8 shadow-sm text-xs text-text-secondary space-y-4 leading-relaxed">
        <h3 className="text-sm font-bold text-navy-900">Our Commitment</h3>
        <p>
          Local Art AI is committed to making our digital marketplace accessible to all individuals, including those with visual, auditory, motor, or cognitive disabilities, adhering to WCAG 2.1 AA guidelines.
        </p>
        <h3 className="text-sm font-bold text-navy-900">Key Accessibility Features</h3>
        <p>
          Our platform includes high-contrast color tokens, keyboard navigation shortcuts, ARIA labels for assistive technologies, and minimum 44×44px interactive tap targets.
        </p>
      </div>
    </div>
  );
};
