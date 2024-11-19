export interface Company {
  id: string;
  name: string;
  cnpj: string;
  status: 'active' | 'inactive' | 'pending';
  plan: 'basic' | 'professional' | 'enterprise';
  createdAt: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contacts: {
    name: string;
    email: string;
    phone: string;
    role: string;
  }[];
  settings: {
    maxUsers: number;
    maxVehicles: number;
    features: string[];
    modules: {
      fleet: boolean;
      maintenance: boolean;
      drivers: boolean;
      tracking: boolean;
      reports: boolean;
      alerts: boolean;
    };
    customization: {
      logo?: string;
      primaryColor?: string;
      companyName: string;
    };
  };
  billing: {
    plan: 'basic' | 'professional' | 'enterprise';
    status: 'active' | 'overdue' | 'cancelled';
    nextBillingDate: string;
    paymentMethod?: {
      type: 'credit_card' | 'bank_transfer';
      lastDigits?: string;
    };
  };
}

export interface CompanyUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  status: 'active' | 'inactive';
  companyId: string;
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  updatedAt?: string;
  department?: string;
  phone?: string;
}

export interface UserInvitation {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  companyId: string;
  status: 'pending' | 'accepted' | 'expired';
  expiresAt: string;
  createdAt: string;
  invitedBy: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: {
    users: number;
    vehicles: number;
    storage: number;
  };
  isActive: boolean;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'in_app';
  subject?: string;
  content: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}