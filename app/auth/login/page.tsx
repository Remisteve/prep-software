'use client'

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Chrome, Heart } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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


    signIn('credentials', { ...formData, redirect: false })
  };

  const handleGoogleLogin = async () => {
    signIn('google', { ...formData, redirect: true })

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl border border-blue-100 shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-blue-900 mb-2">Healthcare Portal</h1>
            <p className="text-blue-600 text-sm">Secure access to your medical dashboard</p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-blue-700 font-medium py-3 px-4 rounded-lg border border-blue-200 transition-all duration-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6 shadow-sm"
          >
            {isGoogleLoading ? (
              <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            ) : (
              <Chrome className="w-4 h-4" />
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-blue-500 uppercase tracking-wide font-medium">or sign in with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <div className="space-y-5">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-blue-200 focus:border-blue-500 focus:ring-blue-500'
                    } rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="your.email@hospital.com"
                  disabled={isLoading || isGoogleLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-blue-200 focus:border-blue-500 focus:ring-blue-500'
                    } rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="Enter your secure password"
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors duration-200"
                  disabled={isLoading || isGoogleLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={isLoading || isGoogleLoading}
                />
                <span className="ml-2 text-sm text-blue-700">Keep me signed in</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                disabled={isLoading || isGoogleLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleEmailLogin}
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Access Medical Portalx'
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              New healthcare professional?{' '}
              <button className="text-blue-700 hover:text-blue-900 font-medium transition-colors duration-200">
                Request Access
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mt-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-900">HIPAA Compliant Access</h3>
              <p className="text-xs text-blue-700 mt-1">
                This portal uses bank-level encryption to protect patient data and maintain medical privacy standards.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-blue-500">
            By accessing this portal, you agree to our{' '}
            <button className="text-blue-700 hover:text-blue-900 transition-colors duration-200 font-medium">
              Medical Privacy Policy
            </button>
            {' '}and{' '}
            <button className="text-blue-700 hover:text-blue-900 transition-colors duration-200 font-medium">
              HIPAA Compliance Terms
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}