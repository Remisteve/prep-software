"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, Shield, Users, Calendar, Activity, MessageSquare, Video, CheckCircle, ArrowRight,
  Stethoscope, UserPlus, LogIn, Sparkles, Star, Building2, Phone, Mail, MapPin,
  Globe, Target, Clock, Award, BookOpen, AlertTriangle, Info, Settings,
  Lock, Menu, X, Loader2, Zap, TrendingUp, HeartHandshake, Pill, FileText, 
  ChevronDown, Fingerprint, ShieldCheck, Command, Terminal, Cpu, Binary, Boxes
} from 'lucide-react';



const SafetyIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3 3v6c0 3.5-1.5 6.5-3 8-1.5-1.5-3-4.5-3-8V5l3-3z"/>
    <path d="M12 11v4"/>
    <path d="M12 17h.01"/>
  </svg>
);

export default function LandingPage() {
  const router = useRouter();
  const [hiddenInput, setHiddenInput] = useState('');
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [activePrEPSection, setActivePrEPSection] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Enhanced admin access state
  const [secretCode, setSecretCode] = useState('');
  const [authStep, setAuthStep] = useState<'input' | 'verifying' | 'granted' | 'denied'>('input');
  const [codeError, setCodeError] = useState('');
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced hidden input detection with visual feedback
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newInput = hiddenInput + e.key.toLowerCase();
      setHiddenInput(newInput);
      
      // Check for trigger words
      if (newInput.endsWith('chak') || newInput.endsWith('remi')) {
        // Trigger haptic-like feedback with visual cue
        document.body.style.transform = 'scale(0.99)';
        setTimeout(() => {
          document.body.style.transform = 'scale(1)';
        }, 100);
        
        setShowAdminPortal(true);
        setAuthStep('input');
        setSecretCode('');
        setCodeError('');
        setBiometricVerified(false);
        setHiddenInput('');
      }
      
      // Clear after 20 characters
      if (newInput.length > 20) {
        setHiddenInput('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hiddenInput]);

  // Enhanced code verification
  const handleCodeSubmit = () => {
    setCodeError('');
    setAuthStep('verifying');
    
    // Simulate verification delay
    setTimeout(() => {
      const validCodes = ['chak', 'remi'];
      
      if (validCodes.includes(secretCode.toLowerCase())) {
        setShowFingerprint(true);
        setAuthStep('input');
      } else {
        setAuthStep('denied');
        setCodeError('Access Denied: Invalid credentials');
        setTimeout(() => {
          setShowAdminPortal(false);
          setAuthStep('input');
          setSecretCode('');
          setCodeError('');
        }, 3000);
      }
    }, 2000);
  };

  // Biometric verification simulation
  const handleBiometricVerification = () => {
    setBiometricVerified(true);
    setAuthStep('granted');
    
    setTimeout(() => {
      setShowAdminPortal(false);
      router.push('/superadmin');
    }, 2500);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setShowAdminPortal(false);
    setSecretCode('');
    setCodeError('');
    setShowFingerprint(false);
    setBiometricVerified(false);
    setAuthStep('input');
  };

  const prepEducationalContent = [
    {
      title: "What is PrEP?",
      icon: <Info className="h-8 w-8" />,
      description: "Pre-Exposure Prophylaxis - Your shield against HIV",
      details: [
        "Pre: Before exposure occurs",
        "Exposure: Activities that may lead to HIV acquisition", 
        "Prophylaxis: Medical prevention strategy",
        "Up to 99% effective when taken as prescribed"
      ],
      gradient: "from-blue-500 to-indigo-600",
      color: "border-blue-200/50 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-white hover:border-blue-300/70"
    },
    {
      title: "Who Should Consider PrEP?",
      icon: <Users className="h-8 w-8" />,
      description: "PrEP is recommended for individuals at higher risk",
      details: [
        "Partners of people living with HIV",
        "Multiple or unknown-status partners",
        "Recent STI diagnosis",
        "Inconsistent condom use",
        "Sharing injection equipment",
        "Engaging in transactional sex",
        "Sex under influence of substances"
      ],
      gradient: "from-purple-500 to-pink-600",
      color: "border-purple-200/50 bg-gradient-to-br from-purple-50/80 via-pink-50/50 to-white hover:border-purple-300/70"
    },
    {
      title: "Starting Your PrEP Journey",
      icon: <Clock className="h-8 w-8" />,
      description: "Simple steps to begin protection",
      details: [
        "Get tested for HIV (must be negative)",
        "Meet with healthcare provider",
        "Start daily medication regimen",
        "Allow 7 days for full protection",
        "Regular check-ups every 3 months"
      ],
      gradient: "from-emerald-500 to-teal-600",
      color: "border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 via-teal-50/50 to-white hover:border-emerald-300/70"
    },
    {
      title: "Where to Access PrEP",
      icon: <MapPin className="h-8 w-8" />,
      description: "Multiple locations for free PrEP services",
      details: [
        "Government health facilities (PEPFAR-funded)",
        "Partner hospitals nationwide",
        "Faith-based health organizations",
        "Selected private clinics",
        "Our 50+ network facilities"
      ],
      gradient: "from-amber-500 to-orange-600",
      color: "border-amber-200/50 bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-white hover:border-amber-300/70"
    },
    {
      title: "PrEP Success Tips",
      icon: <Target className="h-8 w-8" />,
      description: "Maximize your protection with these guidelines",
      details: [
        "Take PrEP same time daily",
        "Set reminders on your phone",
        "Keep emergency doses handy",
        "Continue 28 days after last exposure",
        "Combine with condoms for STI protection"
      ],
      gradient: "from-rose-500 to-pink-600",
      color: "border-rose-200/50 bg-gradient-to-br from-rose-50/80 via-pink-50/50 to-white hover:border-rose-300/70"
    }
  ];

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "PrEP & PEP Excellence",
      description: "Comprehensive HIV prevention with advanced tracking and personalized care plans",
      details: ["AI-powered adherence monitoring", "Emergency PEP within 72 hours", "Side effect management", "24/7 support chat"],
      gradient: "from-blue-500 to-indigo-600",
      color: "border-blue-200/50 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-white hover:border-blue-300/70 hover:shadow-blue-100/50"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Condom Access Network",
      description: "Discreet distribution through multiple channels for comprehensive protection",
      details: ["Vending machine locations", "Home delivery service", "Variety packs available", "Educational materials included"],
      gradient: "from-pink-500 to-rose-600",
      color: "border-pink-200/50 bg-gradient-to-br from-pink-50/80 via-rose-50/50 to-white hover:border-pink-300/70 hover:shadow-pink-100/50"
    },
    {
      icon: <SafetyIcon />,
      title: "Violence Response Unit", 
      description: "Immediate support for survivors with complete confidentiality guaranteed",
      details: ["Crisis intervention team", "Legal aid network", "Safe accommodation", "Trauma-informed counseling"],
      gradient: "from-purple-500 to-indigo-600",
      color: "border-purple-200/50 bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-white hover:border-purple-300/70 hover:shadow-purple-100/50"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Smart Appointment System",
      description: "AI-optimized scheduling with zero waiting time guarantee",
      details: ["Predictive queue management", "Multi-language reminders", "Transport assistance", "Virtual check-in"],
      gradient: "from-emerald-500 to-teal-600",
      color: "border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 via-teal-50/50 to-white hover:border-emerald-300/70 hover:shadow-emerald-100/50"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Telehealth Platform",
      description: "HD consultations with specialists across all departments",
      details: ["E-prescriptions", "Lab result sharing", "Group therapy sessions", "Recording options"],
      gradient: "from-indigo-500 to-purple-600",
      color: "border-indigo-200/50 bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white hover:border-indigo-300/70 hover:shadow-indigo-100/50"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Health Intelligence",
      description: "Predictive analytics for proactive health management",
      details: ["Risk scoring system", "Personalized insights", "Trend forecasting", "Wellness recommendations"],
      gradient: "from-teal-500 to-cyan-600",
      color: "border-teal-200/50 bg-gradient-to-br from-teal-50/80 via-cyan-50/50 to-white hover:border-teal-300/70 hover:shadow-teal-100/50"
    }
  ];

  const userTypes = [
    {
      title: "Patients",
      subtitle: "Your health, your control",
      description: "Join Kenya's largest HIV prevention network",
      icon: <Heart className="h-10 w-10" />,
      features: [
        "2-minute registration process",
        "Choose from 50+ hospitals", 
        "Free condoms & lubricants",
        "PrEP/PEP management suite",
        "Confidential violence support",
        "Mental wellness programs",
        "Peer mentorship network",
        "24/7 telehealth access"
      ],
      stats: {
        users: "10,000+",
        satisfaction: "98%",
        response: "< 5min"
      },
      action: "Begin Your Journey",
      path: "/patient-register",
      gradient: "from-blue-600 to-indigo-700",
      color: "bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white border-blue-200/60",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
    },
    {
      title: "Healthcare Professionals",
      subtitle: "Empowering care excellence",
      description: "Advanced tools for modern healthcare delivery",
      icon: <Stethoscope className="h-10 w-10" />,
      features: [
        "Unified patient records",
        "Cross-facility collaboration",
        "Real-time analytics suite", 
        "Automated workflows",
        "HD consultation studio",
        "Resource optimization",
        "Performance insights",
        "Continuing education"
      ],
      stats: {
        providers: "500+",
        facilities: "50+",
        efficiency: "+40%"
      },
      action: "Access Portal",
      path: "/auth/login",
      gradient: "from-emerald-600 to-teal-700",
      color: "bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border-emerald-200/60", 
      buttonStyle: "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
    }
  ];

  const stats = [
    { 
      number: "10,000+", 
      label: "Active Users", 
      icon: <Users className="h-7 w-7" />,
      gradient: "from-blue-500 to-indigo-600" 
    },
    { 
      number: "50+", 
      label: "Partner Facilities", 
      icon: <Building2 className="h-7 w-7" />,
      gradient: "from-emerald-500 to-teal-600" 
    },
    { 
      number: "99%", 
      label: "PrEP Efficacy", 
      icon: <Award className="h-7 w-7" />,
      gradient: "from-purple-500 to-pink-600" 
    },
    { 
      number: "24/7", 
      label: "Support Available", 
      icon: <HeartHandshake className="h-7 w-7" />,
      gradient: "from-rose-500 to-orange-600" 
    }
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Enhanced Executive Admin Portal Modal */}
      {showAdminPortal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
          <div className="relative w-full max-w-lg">
            {/* Animated background effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            
            <Card className="relative bg-black/90 backdrop-blur-3xl shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-3 duration-700">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {authStep === 'input' && !showFingerprint && (
                <>
                  <CardHeader className="text-center pb-8 pt-10 relative z-10">
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl">
                          <Terminal className="h-16 w-16 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-4xl font-bold text-white mb-3 tracking-wider">
                      EXECUTIVE ACCESS
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg font-light tracking-wide">
                      Ultra-Secure Command Center Portal
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 p-8 relative z-10">
                    {/* Security level indicator */}
                    <div className="flex items-center justify-center space-x-6 mb-8">
                      {['LEVEL 5', 'ENCRYPTED', 'MONITORED'].map((label, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-500 font-mono">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Warning banner */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-5 border border-red-500/30">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                      <div className="relative flex items-center justify-center space-x-3 text-red-400 mb-3">
                        <ShieldCheck className="h-6 w-6" />
                        <span className="font-bold text-sm tracking-wider">RESTRICTED ACCESS</span>
                      </div>
                      <p className="text-xs text-red-300/80 text-center leading-relaxed font-light">
                        This area is protected by advanced security protocols. 
                        All access attempts are logged and monitored in real-time.
                      </p>
                    </div>
                    
                    {/* Code input */}
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-400 flex items-center tracking-wider">
                        <Fingerprint className="h-4 w-4 mr-2 text-indigo-400" />
                        AUTHORIZATION CODE
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                        <input
                          type="password"
                          value={secretCode}
                          onChange={(e) => setSecretCode(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && secretCode && handleCodeSubmit()}
                          placeholder="Enter executive access code"
                          className="relative w-full h-16 px-6 bg-black/50 border-2 border-indigo-500/30 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 text-lg font-mono text-white placeholder:text-gray-600 tracking-wider"
                          autoFocus
                          autoComplete="off"
                          spellCheck="false"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-400">
                          <Binary className="h-6 w-6" />
                        </div>
                      </div>
                      {codeError && (
                        <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 px-4 py-3 rounded-lg animate-in slide-in-from-top-1">
                          <AlertTriangle className="h-4 w-4" />
                          <p className="text-sm font-medium">{codeError}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button 
                        onClick={handleCodeSubmit}
                        className="flex-1 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg shadow-2xl hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 transition-all duration-300 tracking-wider"
                        disabled={!secretCode}
                      >
                        <Command className="mr-3 h-5 w-5" />
                        AUTHENTICATE
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleCloseModal}
                        className="h-14 px-6 border-2 border-gray-700 bg-black/50 text-gray-400 hover:bg-gray-900/50 hover:border-gray-600 hover:text-white font-bold transition-all duration-300"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                  
                  {/* Footer with security info */}
                  <div className="px-8 pb-6 relative z-10">
                    <div className="text-center pt-4 border-t border-gray-800">
                      <div className="flex items-center justify-center space-x-6 text-xs text-gray-600 font-mono">
                        <span className="flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          AES-256
                        </span>
                        <span className="flex items-center">
                          <Cpu className="h-3 w-3 mr-1" />
                          QUANTUM-SAFE
                        </span>
                        <span className="flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          ISO-27001
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Biometric verification screen */}
              {showFingerprint && !biometricVerified && (
                <>
                  <CardHeader className="text-center pb-8 pt-10 relative z-10">
                    <CardTitle className="text-3xl font-bold text-white mb-3">
                      BIOMETRIC VERIFICATION
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg">
                      Secondary authentication required
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-8 p-8 relative z-10">
                    <div className="flex justify-center">
                      <div 
                        className="relative cursor-pointer group"
                        onClick={handleBiometricVerification}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-gray-900 to-black p-12 rounded-full border-4 border-green-500/30 group-hover:border-green-500/50 transition-all duration-500">
                          <Fingerprint className="h-32 w-32 text-green-500 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-3">
                      <p className="text-gray-400 font-light">Place your finger on the scanner</p>
                      <p className="text-xs text-gray-600 font-mono">CLICK TO SIMULATE SCAN</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {['IRIS SCAN', 'VOICE PRINT', 'DNA MATCH'].map((method, i) => (
                        <div key={i} className="text-center p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                          <div className="text-xs text-gray-500 font-mono">{method}</div>
                          <div className="text-xs text-gray-700 mt-1">STANDBY</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </>
              )}

              {/* Verifying state */}
              {authStep === 'verifying' && (
                <CardContent className="py-24 relative z-10">
                  <div className="text-center space-y-8">
                    <div className="flex justify-center">
                      <div className="relative">
                        <Loader2 className="h-16 w-16 text-indigo-500 animate-spin" />
                        <div className="absolute inset-0 h-16 w-16 rounded-full bg-indigo-500/30 animate-ping"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-2xl font-bold text-white">VERIFYING CREDENTIALS</p>
                      <p className="text-gray-400 font-light">Establishing secure connection...</p>
                    </div>
                    <div className="flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}

              {/* Access granted state */}
              {authStep === 'granted' && (
                <>
                  <CardHeader className="text-center pb-8 pt-10 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-full shadow-2xl">
                          <CheckCircle className="h-16 w-16 text-white animate-in zoom-in duration-700" />
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-4xl font-bold text-emerald-400 animate-in fade-in duration-700">
                      ACCESS GRANTED
                    </CardTitle>
                    <CardDescription className="text-emerald-300 text-lg mt-3 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                      Welcome to Executive Command
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="text-center space-y-6">
                      <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-2xl p-6 border border-emerald-500/30 animate-in slide-in-from-bottom duration-700">
                        <div className="flex items-center justify-center space-x-3 text-emerald-400 mb-3">
                          <ShieldCheck className="h-6 w-6" />
                          <span className="font-bold text-lg tracking-wider">AUTHENTICATION COMPLETE</span>
                        </div>
                        <p className="text-sm text-emerald-300/80 leading-relaxed">
                          Full system access granted. Initializing executive dashboard...
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-3 text-emerald-400">
                        <Boxes className="h-6 w-6 animate-spin" />
                        <span className="text-base font-medium">Loading Executive Interface...</span>
                      </div>
                      
                      <div className="pt-2">
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 animate-progress rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {/* Access denied state */}
              {authStep === 'denied' && (
                <>
                  <CardHeader className="text-center pb-8 pt-10 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-full blur-2xl opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-6 rounded-full shadow-2xl animate-shake">
                          <X className="h-16 w-16 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-4xl font-bold text-red-400">
                      ACCESS DENIED
                    </CardTitle>
                    <CardDescription className="text-red-300 text-lg mt-3">
                      Authentication failed
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="text-center space-y-6">
                      <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 rounded-2xl p-6 border border-red-500/30 animate-in slide-in-from-bottom duration-700">
                        <div className="flex items-center justify-center space-x-3 text-red-400 mb-3">
                          <AlertTriangle className="h-6 w-6" />
                          <span className="font-bold text-lg">SECURITY ALERT</span>
                        </div>
                        <p className="text-sm text-red-300/80 leading-relaxed">
                          Invalid credentials. This incident has been logged and reported.
                        </p>
                      </div>
                      
                      <div className="bg-black/50 rounded-lg p-4 border border-red-900/50 font-mono text-xs">
                        <p className="text-red-400">
                          SESSION: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                        <p className="text-red-400">
                          TIME: {new Date().toISOString()}
                        </p>
                        <p className="text-red-400">
                          STATUS: UNAUTHORIZED ACCESS ATTEMPT
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 text-red-400">
                        <Clock className="h-5 w-5 animate-pulse" />
                        <span className="text-sm font-medium">Auto-closing in 3 seconds...</span>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Enhanced Professional Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-white/80 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HIV Self Test/PrEP & PEP
                </h1>
                <p className="text-xs text-gray-500 font-medium">Comprehensive HIV Prevention</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 font-medium" 
                onClick={() => handleNavigation('/auth/login')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Staff Portal
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-semibold" 
                onClick={() => handleNavigation('/patient-register')}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl animate-in slide-in-from-top-2">
              <div className="flex flex-col space-y-2 px-2">
                <Button 
                  variant="ghost" 
                  className="justify-start text-gray-700 hover:bg-gray-100 font-medium" 
                  onClick={() => {
                    handleNavigation('/auth/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Staff Portal
                </Button>
                <Button 
                  className="justify-start bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold" 
                  onClick={() => {
                    handleNavigation('/patient-register');
                    setMobileMenuOpen(false);
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Get Started Free
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Animated badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-800 px-6 py-2.5 border-0 shadow-md backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 text-indigo-600" />
              AI-Powered Healthcare
            </Badge>
            <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-gray-800 px-6 py-2.5 border-0 shadow-md backdrop-blur-sm">
              <TrendingUp className="mr-2 h-4 w-4 text-emerald-600" />
              99% Protection Rate
            </Badge>
            <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-gray-800 px-6 py-2.5 border-0 shadow-md backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4 text-rose-600" />
              Instant Access
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Revolutionary
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              HIV Prevention
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 text-gray-700">
              & Wellness Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-14 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 animation-delay-200">
            Complete care ecosystem connecting <span className="font-semibold text-gray-800">10,000+ patients</span> with 
            <span className="font-semibold text-gray-800"> healthcare heroes</span> through cutting-edge technology
          </p>

          {/* Stats Section with enhanced design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-14 animate-in fade-in slide-in-from-bottom-4 duration-1000 animation-delay-400">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                  <div className={`flex justify-center mb-4 bg-gradient-to-r ${stat.gradient} p-3 rounded-xl w-fit mx-auto shadow-md`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 animation-delay-600">
            <Button 
              size="lg" 
              className="text-lg px-10 md:px-14 py-7 md:py-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold group" 
              onClick={() => handleNavigation('/patient-register')}
            >
              <UserPlus className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Start Free Registration
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 md:px-14 py-7 md:py-8 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-semibold group" 
              onClick={() => handleNavigation('/auth/login')}
            >
              <Stethoscope className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Healthcare Staff Login
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Partners Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative p-5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                <Building2 className="h-14 w-14 text-blue-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Trusted Partner
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Working together to deliver exceptional HIV prevention services across Kenya
            </p>
          </div>

          {/* Partner Spotlight */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white border-2 border-blue-200/60 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
              <CardHeader className="pb-8">
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                  {/* Logo placeholder */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300"></div>
                    <div className="relative bg-white rounded-2xl p-8 border border-gray-100 group-hover:border-gray-200 transition-all duration-300 h-32 w-64 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://raw.githubusercontent.com/Remisteve/prep-software/refs/heads/main/public/chap.png" 
                        alt="CHAP Stawisha Logo"
                        className="max-w-full max-h-16 object-contain filter group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Partner info */}
                  <div className="flex-1 text-center md:text-left">
                    <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      CHAP Stawisha Project
                    </CardTitle>
                    <p className="text-lg font-semibold text-blue-600 mb-4">Christian Health Association of Kenya (CHAK)</p>
                    <CardDescription className="text-gray-600 text-lg leading-relaxed">
                      A CDC-funded project supporting HIV/TB/OVC services in faith-based and county health facilities across 15 counties in Kenya
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* About CHAK */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Award className="h-6 w-6 text-blue-600 mr-2" />
                      About CHAK
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Leading National Faith Based Organization (FBO) established in 1946",
                        "Promoting access to quality health care",
                        "Protestant churches' health facilities network",
                        "Nearly 80 years of healthcare excellence"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="p-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-sm mt-0.5">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Impact */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="h-6 w-6 text-blue-600 mr-2" />
                      Project Coverage
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "15 counties across Kenya",
                        "Offices in Meru, Embu, Kitui and Nairobi",
                        "Faith-based health facilities",
                        "County health facilities"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="p-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-sm mt-0.5">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Innovation Highlight */}
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 border border-blue-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
                    Innovation Spotlight
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    CHAP Stawisha pioneered the innovative "Red Carpet Strategy" - a VIP approach to HIV testing and prevention that encourages men to seek health services through differentiated service delivery.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partnership Stats */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Partnership Impact
                </h3>
                <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto mb-10">
                  Together with CHAP Stawisha, we're expanding HIV prevention services nationwide
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { number: "15", label: "Counties Covered", icon: <MapPin className="h-8 w-8" /> },
                    { number: "4", label: "Regional Offices", icon: <Building2 className="h-8 w-8" /> },
                    { number: "1946", label: "CHAK Founded", icon: <Award className="h-8 w-8" /> },
                    { number: "CDC", label: "Funded Project", icon: <Shield className="h-8 w-8" /> }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-white/30 transition-all duration-300">
                        <div className="flex justify-center mb-4 text-white/90 group-hover:scale-110 transition-transform">
                          {stat.icon}
                        </div>
                        <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                        <div className="text-sm md:text-base opacity-90 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced PrEP Educational Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative p-5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                <BookOpen className="h-14 w-14 text-blue-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              PrEP Education Center
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-blue-600">Power</span> • 
              <span className="font-semibold text-purple-600"> Protection</span> • 
              <span className="font-semibold text-pink-600"> Peace of Mind</span>
            </p>
            <p className="text-lg text-gray-500 mt-4 font-medium">Empowering everyone with knowledge for prevention</p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {prepEducationalContent.map((section, index) => (
              <Card 
                key={index} 
                className={`group ${section.color} border-2 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
                onClick={() => setActivePrEPSection(activePrEPSection === index ? null : index)}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${section.gradient}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 bg-gradient-to-br ${section.gradient} rounded-xl shadow-md text-white transform group-hover:rotate-6 transition-transform`}>
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{section.title}</CardTitle>
                        <CardDescription className="text-gray-600 text-base font-medium">{section.description}</CardDescription>
                      </div>
                    </div>
                    <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${activePrEPSection === index ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
                {activePrEPSection === index && (
                  <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-gray-100 pt-4">
                      <ul className="space-y-3">
                        {section.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-3 group/item">
                            <div className={`p-1 bg-gradient-to-r ${section.gradient} rounded-full shadow-sm`}>
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Enhanced CTA for PrEP section */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Start Your PrEP Journey?
                </h3>
                <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto">
                  Join the movement. Be part of the generation that ends HIV.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold group" 
                    onClick={() => handleNavigation('/patient-register')}
                  >
                    <Pill className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start PrEP Today
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold group" 
                    onClick={() => handleNavigation('/about')}
                  >
                    <BookOpen className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Enhanced User Types Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Journey
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto">
              Two powerful platforms, one unified mission to transform healthcare
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {userTypes.map((type, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Card className={`relative ${type.color} border-2 hover:border-gray-300 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${type.gradient}`}></div>
                  <CardHeader className="pb-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 bg-gradient-to-br ${type.gradient} rounded-2xl shadow-lg text-white transform group-hover:rotate-6 transition-transform`}>
                        {type.icon}
                      </div>
                      <div className="flex space-x-4 text-sm">
                        {Object.entries(type.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="font-bold text-gray-900">{value}</div>
                            <div className="text-gray-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {type.title}
                    </CardTitle>
                    <p className="text-lg font-semibold text-gray-700">{type.subtitle}</p>
                    <CardDescription className="text-gray-600 text-lg mt-3">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 mb-10">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3 group/item">
                          <div className={`p-1 bg-gradient-to-r ${type.gradient} rounded-full shadow-sm mt-0.5`}>
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg group-hover/item:text-gray-900 transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${type.buttonStyle} py-7 md:py-8 text-lg font-bold group/btn`}
                      onClick={() => handleNavigation(type.path)}
                    >
                      {type.action}
                      <ArrowRight className="ml-3 h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-10 border-2 border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Info className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Important Note for Healthcare Staff</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Your account is created by system administrators. 
              <span className="font-semibold"> Doctors can register patients directly</span> from their dashboard. 
              Contact your facility admin for login credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Comprehensive Care Suite
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Everything you need for complete HIV prevention and holistic wellness in one integrated platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`group ${feature.color} border-2 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
                onClick={() => setActiveFeature(activeFeature === index ? null : index)}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                <CardHeader>
                  <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-xl w-fit mb-6 shadow-lg text-white transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                {activeFeature === index && (
                  <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-gray-100 pt-4">
                      <ul className="space-y-3">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center space-x-3 group/item">
                            <div className={`p-1 bg-gradient-to-r ${feature.gradient} rounded-full shadow-sm`}>
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Violence Support Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
              <div className="relative p-5 bg-white/20 backdrop-blur-sm rounded-full">
                <SafetyIcon />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Safe Space for Everyone
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Confidential, compassionate support for survivors of all forms of violence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Phone className="h-14 w-14" />,
                title: "24/7 Crisis Hotline",
                description: "Immediate support from trauma-informed counselors",
                features: ["Anonymous calls", "Multiple languages", "Text support"]
              },
              {
                icon: <Users className="h-14 w-14" />,
                title: "Support Groups",
                description: "Connect with survivors in moderated safe spaces",
                features: ["Weekly sessions", "Peer mentorship", "Online options"]
              },
              {
                icon: <Shield className="h-14 w-14" />,
                title: "Comprehensive Care",
                description: "Full spectrum of support services",
                features: ["Legal assistance", "Medical care", "Safe housing"]
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white group hover:bg-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="mb-6 text-white/90 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <CardTitle className="text-2xl mb-3">{item.title}</CardTitle>
                  <CardDescription className="text-white/80 text-base mb-4">
                    {item.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-white/70">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="text-lg px-12 py-8 bg-white text-purple-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 font-bold group" 
              onClick={() => handleNavigation('/contact')}
            >
              <HeartHandshake className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Access Support Services
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-128 h-128 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative p-6 bg-white/20 backdrop-blur-sm rounded-full">
              <Heart className="h-20 w-20 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Your Health Journey
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-white/90">
              Starts With One Click
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-14 text-white/90 leading-relaxed max-w-4xl mx-auto">
            Join thousands taking control of their health with comprehensive HIV prevention, 
            wellness support, and a caring community
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-14 py-8 bg-white text-purple-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 font-bold group" 
              onClick={() => handleNavigation('/patient-register')}
            >
              <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Start Free Registration
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-14 py-8 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold group" 
              onClick={() => handleNavigation('/about')}
            >
              <Info className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Learn More
            </Button>
          </div>
          
          <div className="mt-14 flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span className="text-sm font-medium">256-bit Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">ISO Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">PrEP/PEP Care</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8">
                Transforming HIV prevention and wellness across Kenya with innovative technology and compassionate care.
              </p>
              <div className="flex space-x-4">
                {[Globe, Mail, Phone].map((Icon, index) => (
                  <div key={index} className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer group">
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer Links */}
            {[
              {
                title: "Patient Services",
                color: "text-blue-400",
                links: [
                  { icon: UserPlus, label: "Free Registration", path: "/patient-register" },
                  { icon: Heart, label: "Patient Dashboard", path: "/dashboard/patient" },
                  { icon: Calendar, label: "Book Appointments", path: "/booking" },
                  { icon: Shield, label: "PrEP/PEP Services", path: "/services/prep" },
                  { icon: Heart, label: "Free Condoms", path: "/condoms" },
                  { icon: Video, label: "Telehealth", path: "/telehealth" }
                ]
              },
              {
                title: "Healthcare Staff",
                color: "text-emerald-400",
                links: [
                  { icon: Stethoscope, label: "Staff Portal", path: "/auth/login" },
                  { icon: Activity, label: "Doctor Dashboard", path: "/dashboard/doctor" },
                  { icon: Star, label: "PrEP Champions", path: "/dashboard/prep-champion" },
                  { icon: Settings, label: "Admin Tools", path: "/admin" },
                  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
                  { icon: Users, label: "Team Management", path: "/team" }
                ]
              },
              {
                title: "Support Resources",
                color: "text-purple-400",
                links: [
                  { icon: HeartHandshake, label: "24/7 Support", path: "/contact" },
                  { icon: Phone, label: "Crisis Hotline", path: "/crisis-support" },
                  { icon: Shield, label: "Violence Support", path: "/violence-support" },
                  { icon: BookOpen, label: "Education Hub", path: "/education" },
                  { icon: Users, label: "Community", path: "/community" },
                  { icon: Heart, label: "Mental Health", path: "/mental-health" }
                ]
              },
              {
                title: "Quick Links",
                color: "text-amber-400",
                links: [
                  { icon: Info, label: "About Us", path: "/about" },
                  { icon: Lock, label: "Privacy Policy", path: "/privacy" },
                  { icon: FileText, label: "Terms of Service", path: "/terms" },
                  { icon: Building2, label: "Partner Hospitals", path: "/hospitals" },
                  { icon: Zap, label: "Careers", path: "/careers" },
                  { icon: MessageSquare, label: "FAQ", path: "/faq" }
                ]
              }
            ].map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className={`text-xl font-semibold mb-8 ${section.color}`}>{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => handleNavigation(link.path)}
                        className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group"
                      >
                        <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-gray-800 pt-10 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                © 2025 PrEP/PEP Care Platform. All rights reserved. 
                <span className="inline-flex items-center ml-2">
                  Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> in Kenya
                </span>
              </p>
              <div className="flex items-center space-x-8 text-sm">
                {[
                  { icon: Award, label: "ISO 27001" },
                  { icon: Shield, label: "HIPAA Compliant" },
                  { icon: Lock, label: "End-to-End Encrypted" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-400">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(30px, -50px) scale(1.1) rotate(120deg); }
          66% { transform: translate(-20px, 20px) scale(0.9) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        .animate-blob {
          animation: blob 20s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        
        .animate-progress {
          animation: progress 2.5s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .zoom-in {
          animation: zoomIn 0.5s ease-out;
        }
        
        .zoom-in-95 {
          animation: zoomIn95 0.5s ease-out;
        }
        
        .slide-in-from-top-2 {
          animation: slideInFromTop2 0.3s ease-out;
        }
        
        .slide-in-from-top-4 {
          animation: slideInFromTop4 0.5s ease-out;
        }
        
        .slide-in-from-bottom-2 {
          animation: slideInFromBottom2 0.3s ease-out;
        }
        
        .slide-in-from-bottom-3 {
          animation: slideInFromBottom3 0.5s ease-out;
        }
        
        .slide-in-from-bottom-4 {
          animation: slideInFromBottom4 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes zoomIn95 {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideInFromTop2 {
          from { transform: translateY(-8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInFromTop4 {
          from { transform: translateY(-16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInFromBottom2 {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInFromBottom3 {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInFromBottom4 {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}