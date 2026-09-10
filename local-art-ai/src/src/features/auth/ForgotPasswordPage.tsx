import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from './authApi';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { useUiStore } from '../../shared/store/uiStore';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { addToast } = useUiStore();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      await authApi.forgotPassword(email.trim());
      setIsSubmitted(true);
      addToast({
        type: 'success',
        title: 'Instructions Sent',
        message: 'If the email exists, password reset instructions have been generated.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Request Failed',
        message: 'Unable to process reset request at this time.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-card shadow-lg border border-neutral-100 p-8">
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sign In
        </Link>

        {isSubmitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Check Your Email</h3>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              We have generated a password reset token for <strong className="text-neutral-900">{email}</strong>. Use the token provided in the system to reset your password.
            </p>
            <Link to="/reset-password">
              <Button variant="accent" className="w-full mt-6">
                Enter Reset Token
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Forgot Password</h2>
              <p className="text-sm text-neutral-500 mt-1">Enter your email to receive recovery instructions</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <Button
                type="submit"
                variant="accent"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                Send Recovery Instructions
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
