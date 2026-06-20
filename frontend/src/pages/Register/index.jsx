import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Stethoscope, Eye, EyeOff, User } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ── Placeholder: show success then redirect to login ──
    // TODO: Replace with POST /api/auth/register when backend is ready
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center px-4 py-8">

      {/* Centered card — responsive width */}
      <div className="w-full md:max-w-md lg:max-w-[450px]">

        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 shadow-sm border border-primary/10">
            <Stethoscope size={36} strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-text">
            QuickCheck <span className="text-primary font-medium">Doctor</span>
          </h1>
          <p className="text-sm text-brand-muted mt-2 font-medium">Less Wait. Better Care.</p>
        </div>

        {/* Success state */}
        {success ? (
          <Card className="shadow-xl border-brand-border p-6 sm:p-8 w-full bg-white text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-brand-text">Account Created!</h2>
                <p className="text-sm text-brand-muted mt-1">Redirecting you to sign in...</p>
              </div>
            </div>
          </Card>
        ) : (
          /* Form card */
          <Card className="shadow-xl border-brand-border p-6 sm:p-8 w-full bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Full Name */}
              <div className="relative">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Dr. Rajat Sharma"
                  icon={User}
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                  error={errors.fullName}
                  required
                />
              </div>

              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                placeholder="doctor@quickcheck.com"
                icon={Mail}
                value={form.email}
                onChange={handleChange('email')}
                error={errors.email}
                required
              />

              {/* Password */}
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  icon={Lock}
                  value={form.password}
                  onChange={handleChange('password')}
                  error={errors.password}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-[38px] text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  icon={Lock}
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  error={errors.confirmPassword}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-[38px] text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Submit button */}
              <Button type="submit" variant="primary" className="w-full py-3 mt-1 font-semibold cursor-pointer">
                Create Account
              </Button>

              {/* Link to Login */}
              <p className="text-center text-sm text-brand-muted">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-bold text-primary hover:underline hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </p>

            </form>
          </Card>
        )}

        <p className="text-center mt-6 text-xs font-medium text-brand-muted tracking-wide">Version 1.0.0</p>
      </div>
    </div>
  );
}
