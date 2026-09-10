import React, { useState, useEffect } from 'react';
import { useProfile, useProfileStats, useProfileMutations } from './useProfile';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { Badge } from '../../shared/components/Badge';
import { User, Lock, Phone, Package, Heart, Star, MapPin, CheckCircle2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { data: user } = useProfile();
  const { data: stats } = useProfileStats();
  const { updateProfile, isUpdatingProfile, changePassword, isChangingPassword } = useProfileMutations();

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.firstName || !profileForm.lastName) return;
    await updateProfile(profileForm);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) return;
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordError('');
    await changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">Account Overview</h2>
        <p className="text-xs text-neutral-500 mt-0.5">Manage your personal information and security settings</p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-neutral-200 flex items-center gap-3 shadow-xs">
          <div className="p-2.5 bg-accent-light text-accent rounded-btn">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-neutral-900">{stats?.orderCount ?? 0}</span>
            <p className="text-[11px] text-neutral-500 font-medium">Total Orders</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-card border border-neutral-200 flex items-center gap-3 shadow-xs">
          <div className="p-2.5 bg-rose-50 text-status-danger rounded-btn">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-neutral-900">{stats?.wishlistCount ?? 0}</span>
            <p className="text-[11px] text-neutral-500 font-medium">Wishlist Items</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-card border border-neutral-200 flex items-center gap-3 shadow-xs">
          <div className="p-2.5 bg-amber-50 text-status-warning rounded-btn">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-neutral-900">{stats?.reviewCount ?? 0}</span>
            <p className="text-[11px] text-neutral-500 font-medium">Reviews</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-card border border-neutral-200 flex items-center gap-3 shadow-xs">
          <div className="p-2.5 bg-sky-50 text-status-info rounded-btn">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-neutral-900">{stats?.addressCount ?? 0}</span>
            <p className="text-[11px] text-neutral-500 font-medium">Addresses</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details Form */}
        <div className="bg-white rounded-card border border-neutral-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <User className="w-4 h-4 text-accent" /> Personal Details
            </h3>
            <Badge variant={user?.isVerified ? 'success' : 'warning'} size="sm">
              {user?.isVerified ? 'Verified Account' : 'Unverified Email'}
            </Badge>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                value={profileForm.firstName}
                onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                required
              />
              <Input
                label="Last Name"
                value={profileForm.lastName}
                onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                required
              />
            </div>

            <Input
              label="Email Address"
              value={user?.email || ''}
              disabled
              helperText="Email cannot be changed directly."
            />

            <Input
              label="Phone Number"
              placeholder="+254 700 000000"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              leftIcon={<Phone className="w-4 h-4" />}
            />

            <Button type="submit" variant="accent" isLoading={isUpdatingProfile} className="w-full">
              Save Profile Changes
            </Button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white rounded-card border border-neutral-200 p-6 space-y-4 shadow-sm">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Security & Password
            </h3>
          </div>

          {passwordError && (
            <div className="p-3 bg-red-50 text-status-danger text-xs rounded-btn font-medium">
              {passwordError}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              required
            />

            <Input
              label="New Password"
              type="password"
              placeholder="At least 8 characters"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter new password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              required
            />

            <Button type="submit" variant="primary" isLoading={isChangingPassword} className="w-full">
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
