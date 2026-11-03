export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'MXN';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  currency: CurrencyCode;
  status: TransactionStatus;
  description: string;
  merchantName: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface TransactionSummary {
  totalCredits: number;
  totalDebits: number;
  netAmount: number;
  transactionCount: number;
  averageAmount: number;
  currency: CurrencyCode;
}

export interface TransactionFilter {
  accountId?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  category?: string;
  merchantName?: string;
}

export interface TransactionPageResult {
  transactions: Transaction[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function createTransaction(partial: Partial<Transaction>): Transaction {
  const now = new Date();
  return {
    id: partial.id ?? crypto.randomUUID(),
    accountId: partial.accountId ?? '',
    type: partial.type ?? 'debit',
    amount: partial.amount ?? 0,
    currency: partial.currency ?? 'USD',
    status: partial.status ?? 'pending',
    description: partial.description ?? '',
    merchantName: partial.merchantName ?? '',
    category: partial.category ?? 'general',
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
    metadata: partial.metadata ?? {},
  };
}

export function isCreditTransaction(transaction: Transaction): boolean {
  return transaction.type === 'credit';
}

export function isDebitTransaction(transaction: Transaction): boolean {
  return transaction.type === 'debit';
}

export function isPendingTransaction(transaction: Transaction): boolean {
  return transaction.status === 'pending';
}

export function isCompletedTransaction(transaction: Transaction): boolean {
  return transaction.status === 'completed';
}

export function formatTransactionAmount(transaction: Transaction): string {
  const sign = transaction.type === 'credit' ? '+' : '-';
  return `${sign}$${transaction.amount.toFixed(2)}`;
}

export function calculateTransactionFee(transaction: Transaction, feePercentage: number): number {
  return transaction.amount * (feePercentage / 100);
}

export function calculateNetAmount(transaction: Transaction, fee: number): number {
  return transaction.type === 'credit' 
    ? transaction.amount - fee 
    : transaction.amount + fee;
}