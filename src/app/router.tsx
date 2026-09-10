import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../routes/RootLayout';
import { AuthLayout } from '../routes/AuthLayout';
import { CustomerLayout } from '../routes/CustomerLayout';
import { AdminLayout } from '../routes/AdminLayout';
import { ProtectedRoute, PublicOnlyRoute, AdminRoute } from '../routes/guards';

// Lazy-loaded pages
const HomePage = lazy(() => import('../features/catalog/HomePage').then((m) => ({ default: m.HomePage })));
const CatalogPage = lazy(() => import('../features/catalog/CatalogPage').then((m) => ({ default: m.CatalogPage })));
const CategoriesPage = lazy(() => import('../features/catalog/CategoriesPage').then((m) => ({ default: m.CategoriesPage })));
const ProductDetailPage = lazy(() =>
  import('../features/catalog/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const CartPage = lazy(() => import('../features/cart/CartPage').then((m) => ({ default: m.CartPage })));
const WishlistPage = lazy(() => import('../features/wishlist/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const CheckoutPage = lazy(() => import('../features/checkout/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));

// Account sub-pages
const ProfilePage = lazy(() => import('../features/profile/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const OrderListPage = lazy(() => import('../features/orders/OrderListPage').then((m) => ({ default: m.OrderListPage })));
const OrderDetailPage = lazy(() =>
  import('../features/orders/OrderDetailPage').then((m) => ({ default: m.OrderDetailPage }))
);
const AddressListPage = lazy(() =>
  import('../features/addresses/AddressListPage').then((m) => ({ default: m.AddressListPage }))
);
const PaymentMethodsPage = lazy(() =>
  import('../features/profile/PaymentMethodsPage').then((m) => ({ default: m.PaymentMethodsPage }))
);
const NotificationsPage = lazy(() =>
  import('../features/notifications/NotificationsPage').then((m) => ({ default: m.NotificationsPage }))
);
const SecurityPage = lazy(() => import('../features/profile/SecurityPage').then((m) => ({ default: m.SecurityPage })));
const SettingsPage = lazy(() => import('../features/profile/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const SupportPage = lazy(() => import('../features/profile/SupportPage').then((m) => ({ default: m.SupportPage })));

// Informational & Support Pages
const HelpCenterPage = lazy(() =>
  import('../features/info/SupportPages').then((m) => ({ default: m.HelpCenterPage }))
);
const ContactUsPage = lazy(() =>
  import('../features/info/SupportPages').then((m) => ({ default: m.ContactUsPage }))
);
const TrackOrderPage = lazy(() =>
  import('../features/info/SupportPages').then((m) => ({ default: m.TrackOrderPage }))
);
const ReturnsPage = lazy(() =>
  import('../features/info/SupportPages').then((m) => ({ default: m.ReturnsPage }))
);
const FaqsPage = lazy(() =>
  import('../features/info/SupportPages').then((m) => ({ default: m.FaqsPage }))
);

// Legal Pages
const PrivacyPolicyPage = lazy(() =>
  import('../features/info/LegalPages').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsOfServicePage = lazy(() =>
  import('../features/info/LegalPages').then((m) => ({ default: m.TermsOfServicePage }))
);
const CookiePolicyPage = lazy(() =>
  import('../features/info/LegalPages').then((m) => ({ default: m.CookiePolicyPage }))
);
const AccessibilityPage = lazy(() =>
  import('../features/info/LegalPages').then((m) => ({ default: m.AccessibilityPage }))
);

// Auth pages
const LoginPage = lazy(() => import('../features/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../features/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() =>
  import('../features/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import('../features/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
);

// Admin pages
const AdminDashboardOverview = lazy(() =>
  import('../features/admin/AdminDashboardOverview').then((m) => ({ default: m.AdminDashboardOverview }))
);
const AdminProductsPage = lazy(() =>
  import('../features/admin/AdminProductsPage').then((m) => ({ default: m.AdminProductsPage }))
);
const AdminInventoryPage = lazy(() =>
  import('../features/admin/AdminInventoryPage').then((m) => ({ default: m.AdminInventoryPage }))
);
const AdminOrdersPage = lazy(() =>
  import('../features/admin/AdminOrdersPage').then((m) => ({ default: m.AdminOrdersPage }))
);
const AdminReviewsPage = lazy(() =>
  import('../features/admin/AdminReviewsPage').then((m) => ({ default: m.AdminReviewsPage }))
);
const AdminCouponsPage = lazy(() =>
  import('../features/admin/AdminCouponsPage').then((m) => ({ default: m.AdminCouponsPage }))
);
const AdminCustomersPage = lazy(() =>
  import('../features/admin/AdminCustomersPage').then((m) => ({ default: m.AdminCustomersPage }))
);
const AdminSettingsPage = lazy(() =>
  import('../features/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage }))
);

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] py-24">
          <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <PageSuspense><HomePage /></PageSuspense> },
      { path: 'marketplace', element: <PageSuspense><CatalogPage /></PageSuspense> },
      { path: 'categories', element: <PageSuspense><CategoriesPage /></PageSuspense> },
      { path: 'category/:slug', element: <PageSuspense><CatalogPage /></PageSuspense> },
      { path: 'product/:id', element: <PageSuspense><ProductDetailPage /></PageSuspense> },
      { path: 'product/:slug', element: <PageSuspense><ProductDetailPage /></PageSuspense> },
      { path: 'search', element: <PageSuspense><CatalogPage /></PageSuspense> },

      // Legacy/alias routes
      { path: 'products', element: <PageSuspense><CatalogPage /></PageSuspense> },
      { path: 'products/:id', element: <PageSuspense><ProductDetailPage /></PageSuspense> },
      { path: 'categories/:slug', element: <PageSuspense><CatalogPage /></PageSuspense> },
      { path: 'cart', element: <PageSuspense><CartPage /></PageSuspense> },
      { path: 'checkout', element: <PageSuspense><CheckoutPage /></PageSuspense> },

      // Support & Informational routes
      { path: 'help', element: <PageSuspense><HelpCenterPage /></PageSuspense> },
      { path: 'contact', element: <PageSuspense><ContactUsPage /></PageSuspense> },
      { path: 'track-order', element: <PageSuspense><TrackOrderPage /></PageSuspense> },
      { path: 'returns', element: <PageSuspense><ReturnsPage /></PageSuspense> },
      { path: 'faqs', element: <PageSuspense><FaqsPage /></PageSuspense> },

      // Legal routes
      { path: 'privacy', element: <PageSuspense><PrivacyPolicyPage /></PageSuspense> },
      { path: 'terms', element: <PageSuspense><TermsOfServicePage /></PageSuspense> },
      { path: 'cookies', element: <PageSuspense><CookiePolicyPage /></PageSuspense> },
      { path: 'accessibility', element: <PageSuspense><AccessibilityPage /></PageSuspense> },

      // Account section (protected)
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <CustomerLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'profile', element: <PageSuspense><ProfilePage /></PageSuspense> },
          { path: 'orders', element: <PageSuspense><OrderListPage /></PageSuspense> },
          { path: 'orders/:id', element: <PageSuspense><OrderDetailPage /></PageSuspense> },
          { path: 'wishlist', element: <PageSuspense><WishlistPage /></PageSuspense> },
          { path: 'addresses', element: <PageSuspense><AddressListPage /></PageSuspense> },
          { path: 'payment-methods', element: <PageSuspense><PaymentMethodsPage /></PageSuspense> },
          { path: 'notifications', element: <PageSuspense><NotificationsPage /></PageSuspense> },
          { path: 'security', element: <PageSuspense><SecurityPage /></PageSuspense> },
          { path: 'settings', element: <PageSuspense><SettingsPage /></PageSuspense> },
          { path: 'support', element: <PageSuspense><SupportPage /></PageSuspense> },
        ],
      },

      // Admin section
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspense>
                <AdminDashboardOverview />
              </PageSuspense>
            ),
          },
          { path: 'products', element: <PageSuspense><AdminProductsPage /></PageSuspense> },
          { path: 'inventory', element: <PageSuspense><AdminInventoryPage /></PageSuspense> },
          { path: 'orders', element: <PageSuspense><AdminOrdersPage /></PageSuspense> },
          { path: 'reviews', element: <PageSuspense><AdminReviewsPage /></PageSuspense> },
          { path: 'coupons', element: <PageSuspense><AdminCouponsPage /></PageSuspense> },
          { path: 'customers', element: <PageSuspense><AdminCustomersPage /></PageSuspense> },
          { path: 'settings', element: <PageSuspense><AdminSettingsPage /></PageSuspense> },
        ],
      },
    ],
  },

  // Auth routes
  {
    element: (
      <PublicOnlyRoute>
        <AuthLayout />
      </PublicOnlyRoute>
    ),
    children: [
      { path: 'login', element: <PageSuspense><LoginPage /></PageSuspense> },
      { path: 'register', element: <PageSuspense><RegisterPage /></PageSuspense> },
      { path: 'forgot-password', element: <PageSuspense><ForgotPasswordPage /></PageSuspense> },
      { path: 'reset-password', element: <PageSuspense><ResetPasswordPage /></PageSuspense> },
    ],
  },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
