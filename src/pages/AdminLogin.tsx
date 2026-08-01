import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('fde_admin_auth', 'true');
      localStorage.setItem('fde_admin_user', username);
      navigate('/admin/dashboard');
    }, 900);
  };

  const handleDemoFill = () => {
    setUsername('admin@futuredesign.engineering');
    setPassword('SuperAdmin2026!');
    setError(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white flex items-center justify-center overflow-hidden font-body selection:bg-gold selection:text-black">
      {/* Grid Pattern and Ambient Halo Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold/15 via-royal-blue/10 to-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#0c0c0c]/70 backdrop-blur-2xl border border-gold/25 rounded-2xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.08)] overflow-hidden"
        >
          {/* Gold Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold via-amber-300 to-transparent opacity-90" />

          {/* Logo & Header Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center p-3 rounded-2xl bg-black/80 border border-gold/30 shadow-lg shadow-gold/10 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold to-amber-300 text-black flex items-center justify-center font-heading font-extrabold text-xl shadow-md">
                FD
              </div>
            </motion.div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Control Panel Login
            </h1>
            <p className="text-white/50 text-xs sm:text-sm mt-1">
              Future Design Engineering Executive Portal
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs sm:text-sm flex items-center gap-2.5"
            >
              <AlertCircle size={18} className="text-red-400 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                Administrator Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@futuredesign.engineering"
                  className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Secure Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link sent to registered admin email.');
                  }}
                  className="text-xs text-gold/80 hover:text-gold transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-black/60 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-gold via-amber-400 to-gold-dim text-black font-body font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/35 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col items-center">
            <button
              type="button"
              onClick={handleDemoFill}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-gold/15 border border-white/10 hover:border-gold/40 rounded-full text-xs text-white/80 hover:text-gold transition-all duration-200"
            >
              <Sparkles size={13} className="text-gold" />
              <span>Autofill Demo Admin Credentials</span>
            </button>
          </div>

          {/* Security Status Badge */}
          <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-white/40">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-emerald-400" /> 256-Bit Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-gold" /> System Active
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
