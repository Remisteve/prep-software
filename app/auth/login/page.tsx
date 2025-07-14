'use client'

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Chrome, Heart, Sparkles, Shield } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/custom/GlassCard';

interface NewErrors {
  email?: string
  general?: string
  password?: string
}


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingEmailPassword, setIsLoadingEmailPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<NewErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof NewErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: NewErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;
    setIsLoadingEmailPassword(true)

    await signIn('credentials', { ...formData, redirect: false })
    setIsLoadingEmailPassword(false)
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    await signIn('google', { ...formData, redirect: false })
    setIsGoogleLoading(false)
  };

  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (session) {
      router.push('/profile')
    }
  }, [status, session])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/10 to-purple-600/5" />

      {/* Floating sparkles */}
      <Sparkles className="absolute top-10 left-10 w-4 h-4 text-blue-400 opacity-30 animate-pulse" />
      <Sparkles className="absolute top-20 right-16 w-3 h-3 text-cyan-400 opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      <Sparkles className="absolute bottom-16 left-1/4 w-3 h-3 text-purple-400 opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
      <Sparkles className="absolute bottom-10 right-10 w-2 h-2 text-blue-300 opacity-30 animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Gradient orbs for depth */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-sm relative z-10">
        <GlassCard variant="primary" className="p-6 shadow-2xl shadow-blue-500/20" hover>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/10 to-purple-600/5 rounded-2xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          {/* Floating sparkles in card */}
          <Sparkles className="absolute top-4 right-6 w-3 h-3 text-blue-400 opacity-30 animate-pulse" />
          <Sparkles className="absolute bottom-6 left-6 w-2 h-2 text-cyan-400 opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }} />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 
                flex items-center justify-center shadow-2xl shadow-blue-500/30 border border-blue-400/30 
                backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Heart className="w-8 h-8 text-white relative z-10" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text">
                Healthcare Portal
              </h1>
              <p className="text-blue-400 text-sm font-medium">Secure access to your medical dashboard</p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isLoadingEmailPassword}
              className="w-full flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 
                text-white font-medium py-3 px-4 rounded-xl border border-white/20 
                transition-all duration-300 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20
                disabled:opacity-50 disabled:cursor-not-allowed mb-6 backdrop-blur-md
                hover:scale-[1.02] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-500 rounded-full animate-spin"></div>
              ) : (
                <Chrome className="w-4 h-4 text-blue-400" />
              )}
              <span className="relative z-10">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-black/40 text-blue-400 uppercase tracking-wide font-medium 
                  rounded-full border border-white/10 backdrop-blur-md">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <div className="space-y-4">
              {errors.general && (
                <GlassCard variant="danger" className="p-4">
                  <div className="text-red-400 text-sm font-medium">
                    {errors.general}
                  </div>
                </GlassCard>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 
                    group-focus-within:text-blue-300 transition-colors duration-200" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-3 bg-black/40 backdrop-blur-md border 
                      ${errors.email
                        ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-white/20 focus:border-blue-400/60 focus:ring-blue-400/20'
                      } 
                      rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      transition-all duration-300 hover:bg-black/50 hover:border-white/30`}
                    placeholder="your.email@hospital.com"
                    disabled={isLoadingEmailPassword || isGoogleLoading}
                  />
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                    opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 
                    group-focus-within:text-blue-300 transition-colors duration-200" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 bg-black/40 backdrop-blur-md border 
                      ${errors.password
                        ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-white/20 focus:border-blue-400/60 focus:ring-blue-400/20'
                      } 
                      rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      transition-all duration-300 hover:bg-black/50 hover:border-white/30`}
                    placeholder="Enter your secure password"
                    disabled={isLoadingEmailPassword || isGoogleLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 
                      hover:text-blue-300 transition-colors duration-200 p-1 rounded-lg 
                      hover:bg-white/10 group"
                    disabled={isLoadingEmailPassword || isGoogleLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                    opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-500 bg-black/40 border-white/20 rounded 
                      focus:ring-blue-500/20 focus:ring-2 backdrop-blur-md transition-all duration-200"
                    disabled={isLoadingEmailPassword || isGoogleLoading}
                  />
                  <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                    Keep me signed in
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium 
                    transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-white/10"
                  disabled={isLoadingEmailPassword || isGoogleLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleEmailLogin}
                disabled={isLoadingEmailPassword || isGoogleLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                  text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 
                  hover:shadow-2xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed 
                  flex items-center justify-center hover:scale-[1.02] border border-blue-400/30
                  relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {isLoadingEmailPassword ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="flex items-center space-x-2 relative z-10">
                    <Shield className="w-4 h-4" />
                    <span>Access Medical Portal</span>
                  </span>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                New healthcare professional?{' '}
                <button className="text-blue-400 hover:text-blue-300 font-semibold 
                  transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-white/10">
                  Request Access
                </button>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-4 text-center">
              <GlassCard className="p-2 inline-flex items-center space-x-2">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-gray-300">HIPAA Compliant • SSL Encrypted</span>
              </GlassCard>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}