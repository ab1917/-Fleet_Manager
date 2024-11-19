export interface FinancialTransaction {
  id: string;
  companyId?: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod?: string;
  document?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialReport {
  period: {
    start: string;
    end: string;
  };
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
  byCategory: {
    category: string;
    income: number;
    expense: number;
    balance: number;
  }[];
  transactions: FinancialTransaction[];
}

export interface FinancialDashboard {
  currentBalance: number;
  pendingIncome: number;
  pendingExpenses: number;
  monthlyComparison: {
    month: string;
    income: number;
    expense: number;
  }[];
  topExpenseCategories: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface CompanyBilling {
  id: string;
  companyId: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'overdue' | 'cancelled';
  amount: number;
  dueDate: string;
  paidAt?: string;
  paymentMethod?: {
    type: 'credit_card' | 'bank_transfer';
    lastDigits?: string;
  };
  invoices: {
    id: string;
    number: string;
    amount: number;
    status: 'paid' | 'pending' | 'cancelled';
    issuedAt: string;
    paidAt?: string;
    dueDate: string;
    url?: string;
  }[];
}