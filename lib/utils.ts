import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isAfter, isBefore, isToday, isTomorrow, parseISO } from "date-fns";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Status style helper
export const getStatusStyles = (status) => {
  const styles = {
    success: {
      bg: 'bg-black/30',
      border: 'border-emerald-400/40',
      text: 'text-emerald-400',
      icon: 'text-emerald-400'
    },
    warning: {
      bg: 'bg-black/30',
      border: 'border-amber-400/40', 
      text: 'text-amber-400',
      icon: 'text-amber-400'
    },
    error: {
      bg: 'bg-black/30',
      border: 'border-red-400/40',
      text: 'text-red-400', 
      icon: 'text-red-400'
    },
    info: {
      bg: 'bg-black/30',
      border: 'border-blue-400/40',
      text: 'text-blue-400',
      icon: 'text-blue-400'
    },
    neutral: {
      bg: 'bg-black/30',
      border: 'border-white/20',
      text: 'text-gray-300',
      icon: 'text-gray-300'
    }
  };
  
  return styles[status] || styles.neutral;
};

// Date utility functions
export const dateUtils = {
  formatDate: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  },
  
  formatDateTime: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'MMM dd, yyyy - h:mm a');
  },
  
  formatTime: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'h:mm a');
  },
  
  getRelativeTime: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  },
  
  isUpcoming: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isAfter(dateObj, new Date());
  },
  
  isPast: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isBefore(dateObj, new Date());
  },
  
  isToday: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isToday(dateObj);
  },
  
  isTomorrow: (date: string | Date) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isTomorrow(dateObj);
  }
};

// Appointment utilities
export const appointmentUtils = {
  getStatusColor: (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100 border-green-200';
      case 'scheduled': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'completed': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'missed': return 'text-red-600 bg-red-100 border-red-200';
      case 'rescheduled': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'canceled': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  },
  
  filterAppointments: (appointments: any[], filter: string) => {
    
    switch (filter) {
      case 'all':
        return appointments;
      case 'upcoming':
        return appointments.filter(apt => 
          dateUtils.isUpcoming(apt.datetime) && 
          !['canceled', 'missed'].includes(apt.status)
        );
      case 'today':
        return appointments.filter(apt => dateUtils.isToday(apt.datetime));
      case 'completed':
        return appointments.filter(apt => apt.status === 'completed');
      case 'missed':
        return appointments.filter(apt => apt.status === 'missed');
      case 'rescheduled':
        return appointments.filter(apt => apt.status === 'rescheduled');
      case 'canceled':
        return appointments.filter(apt => apt.status === 'canceled');
      default:
        return appointments;
    }
  }
};

// Patient request utilities
export const requestUtils = {
  getRequestTypeColor: (type: string) => {
    switch (type) {
      case 'prep': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'pep': return 'text-green-600 bg-green-100 border-green-200';
      case 'condom': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'hospital_join': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'transfer': return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      case 'general': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  },
  
  getRequestStatus: (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'approved': return 'text-green-600 bg-green-100 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-100 border-red-200';
      case 'under_review': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  },
  
  getPriorityColor: (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  }
};

// User utilities
export const userUtils = {
  getRoleColor: (role: string) => {
    switch (role) {
      case 'superadmin': return 'text-red-600 bg-red-100 border-red-200';
      case 'admin': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'doctor': return 'text-green-600 bg-green-100 border-green-200';
      case 'prep_champion': return 'text-pink-600 bg-pink-100 border-pink-200';
      case 'patient': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  },
  
  getPatientStatusColor: (status: string) => {
    switch (status) {
      case 'prep': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'pep': return 'text-green-600 bg-green-100 border-green-200';
      case 'condom': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'general': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  },
  
  getInitials: (name: string) => {
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
};

// Notification utilities
export const notificationUtils = {
  getNotificationColor: (type: string) => {
    switch (type) {
      case 'appointment': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'medication': return 'text-green-600 bg-green-100 border-green-200';
      case 'video_upload': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'message': return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      case 'request': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'alert': return 'text-red-600 bg-red-100 border-red-200';
      case 'system': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  },
  
  getNotificationIcon: (type: string) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'medication': return '💊';
      case 'video_upload': return '🎥';
      case 'message': return '💬';
      case 'request': return '📋';
      case 'alert': return '⚠️';
      case 'system': return '🔧';
      case 'friend_request': return '👥';
      case 'achievement': return '🏆';
      default: return '📌';
    }
  }
};

// Analytics utilities
export const analyticsUtils = {
  calculatePercentage: (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  },
  
  calculateGrowth: (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  },
  
  formatNumber: (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
};

// Form validation utilities
export const validationUtils = {
  isValidEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isValidPhone: (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  },
  
  isStrongPassword: (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
  }
};

// File utilities
export const fileUtils = {
  formatFileSize: (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  isValidVideoType: (type: string) => {
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi'];
    return validTypes.includes(type);
  },
  
  isValidImageType: (type: string) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(type);
  }
};

// Local storage utilities
export const storageUtils = {
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  getItem: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Search and filter utilities
export const searchUtils = {
  searchByName: (items: any[], searchTerm: string, nameField = 'name') => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item[nameField]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
  
  filterByMultipleFields: (items: any[], filters: Record<string, any>) => {
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all') return true;
        return item[key] === value;
      });
    });
  }
};

// Constants
export const CONSTANTS = {
  ROLES: {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    PREP_CHAMPION: 'prep_champion',
    PATIENT: 'patient'
  },
  
  APPOINTMENT_STATUSES: {
    SCHEDULED: 'scheduled',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    MISSED: 'missed',
    RESCHEDULED: 'rescheduled',
    CANCELED: 'canceled'
  },
  
  REQUEST_TYPES: {
    PREP: 'prep',
    PEP: 'pep',
    CONDOM: 'condom',
    HOSPITAL_JOIN: 'hospital_join',
    TRANSFER: 'transfer',
    GENERAL: 'general'
  },
  
  REQUEST_STATUSES: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    UNDER_REVIEW: 'under_review',
    URGENT: 'urgent'
  },
  
  PATIENT_STATUSES: {
    PREP: 'prep',
    PEP: 'pep',
    CONDOM: 'condom',
    GENERAL: 'general'
  },
  
  NOTIFICATION_TYPES: {
    APPOINTMENT: 'appointment',
    MEDICATION: 'medication',
    VIDEO_UPLOAD: 'video_upload',
    MESSAGE: 'message',
    REQUEST: 'request',
    ALERT: 'alert',
    SYSTEM: 'system',
    FRIEND_REQUEST: 'friend_request',
    ACHIEVEMENT: 'achievement'
  }
};

// Export all utilities as default
export default {
  dateUtils,
  appointmentUtils,
  requestUtils,
  userUtils,
  notificationUtils,
  analyticsUtils,
  validationUtils,
  fileUtils,
  storageUtils,
  searchUtils,
  CONSTANTS
};
