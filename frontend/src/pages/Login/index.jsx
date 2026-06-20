import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Stethoscope, Eye, EyeOff } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignIn = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    navigate('/dashboard');
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

        {/* Form card */}
        <Card className="shadow-xl border-brand-border p-6 sm:p-8 w-full bg-white">
          <form onSubmit={handleSignIn} className="flex flex-col gap-5">

            <Input
              label="Email Address"
              type="email"
              placeholder="doctor@quickcheck.com"
              icon={Mail}
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
              error={errors.email}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: '' }); }}
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

            <div className="flex justify-end -mt-2">
              <a href="#forgot" className="text-xs font-semibold text-primary hover:underline hover:text-blue-700 transition-colors">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 mt-1 font-semibold cursor-pointer">
              Sign In
            </Button>

            {/* Link to Register */}
            <p className="text-center text-sm text-brand-muted">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-bold text-primary hover:underline hover:text-blue-700 transition-colors cursor-pointer"
              >
                Create Account
              </button>
            </p>

          </form>
        </Card>

        <p className="text-center mt-6 text-xs font-medium text-brand-muted tracking-wide">Version 1.0.0</p>
      </div>
    </div>
  );
}
