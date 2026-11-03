import { Injectable, signal, computed } from '@angular/core';
import { Observable, BehaviorSubject, of, delay, map, catchError, tap } from 'rxjs';
import { Transaction, TransactionStatus, TransactionType } from './transaction.model';
import { TransactionObserver, TransactionEvent, TransactionEventType } from '../../core/observers/transaction.observer';
import { AppConfigService } from '../../core/config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly transactions$ = new BehaviorSubject<Transaction[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  private readonly error$ = new BehaviorSubject<string | null>(null);

  readonly transactions = signal<Transaction[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly transactionCount = computed(() => this.transactions().length);
  readonly totalBalance = computed(() => 
    this.transactions().reduce((sum, t) => {
      const amount = t.type === TransactionType.CREDIT ? t.amount : -t.amount;
      return sum + amount;
    }, 0)
  );

  constructor(
    private readonly transactionObserver: TransactionObserver,
    private readonly appConfig: AppConfigService
  ) {
    this.loadInitialTransactions();
  }

  private loadInitialTransactions(): void {
    const mockTransactions: Transaction[] = [
      {
        id: 'txn-001',
        accountId: 'acc-12345',
        type: TransactionType.CREDIT,
        amount: 1500.00,
        currency: 'USD',
        status: TransactionStatus.COMPLETED,
        description: 'Depósito de nómina',
        createdAt: new Date('2024-01-15T09:00:00Z'),
        updatedAt: new Date('2024-01-15T09:00:00Z'),
        category: 'income'
      },
      {
        id: 'txn-002',
        accountId: 'acc-12345',
        type: TransactionType.DEBIT,
        amount: 250.50,
        currency: 'USD',
        status: TransactionStatus.COMPLETED,
        description: 'Compra en supermercado',
        createdAt: new Date('2024-01-16T14:30:00Z'),
        updatedAt: new Date('2024-01-16T14:30:00Z'),
        category: 'shopping'
      },
      {
        id: 'txn-003',
        accountId: 'acc-12345',
        type: TransactionType.DEBIT,
        amount: 120.00,
        currency: 'USD',
        status: TransactionStatus.PENDING,
        description: 'Pago de servicios',
        createdAt: new Date('2024-01-17T10:00:00Z'),
        updatedAt: new Date('2024-01-17T10:00:00Z'),
        category: 'utilities'
      },
      {
        id: 'txn-004',
        accountId: 'acc-12345',
        type: TransactionType.CREDIT,
        amount: 3500.00,
        currency: 'USD',
        status: TransactionStatus.COMPLETED,
        description: 'Transferencia recibida',
        createdAt: new Date('2024-01-18T16:45:00Z'),
        updatedAt: new Date('2024-01-18T16:45:00Z'),
        category: 'transfer'
      },
      {
        id: 'txn-005',
        accountId: 'acc-12345',
        type: TransactionType.DEBIT,
        amount: 89.99,
        currency: 'USD',
        status: TransactionStatus.FAILED,
        description: 'Pago rechazado',
        createdAt: new Date('2024-01-19T11:20:00Z'),
        updatedAt: new Date('2024-01-19T11:25:00Z'),
        category: 'other'
      }
    ];

    this.transactions$.next(mockTransactions);
    this.transactions.set(mockTransactions);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$.asObservable();
  }

  getTransactionById(id: string): Observable<Transaction | undefined> {
    return this.transactions$.pipe(
      map(transactions => transactions.find(t => t.id === id))
    );
  }

  getTransactionsByAccount(accountId: string): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => t.accountId === accountId))
    );
  }

  getTransactionsByStatus(status: TransactionStatus): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => t.status === status))
    );
  }

  getTransactionsByType(type: TransactionType): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => t.type === type))
    );
  }

  createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Observable<Transaction> {
    this.loading$.next(true);
    this.error$.next(null);
    this.loading.set(true);
    this.error.set(null);

    const newTransaction: Transaction = {
      ...transaction,
      id: this.generateTransactionId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(newTransaction).pipe(
      delay(500),
      tap(tx => {
        const current = this.transactions$.value;
        this.transactions$.next([...current, tx]);
        this.transactions.set([...this.transactions(), tx]);
        this.transactionObserver.notifyCreated(tx);
      }),
      catchError(err => {
        const errorMsg = 'Error al crear la transacción';
        this.error$.next(errorMsg);
        this.error.set(errorMsg);
        this.transactionObserver.notifyError(newTransaction, err.message);
        throw err;
      }),
      tap(() => {
        this.loading$.next(false);
        this.loading.set(false);
      })
    );
  }

  updateTransaction(id: string, updates: Partial<Transaction>): Observable<Transaction> {
    this.loading$.next(true);
    this.error$.next(null);
    this.loading.set(true);
    this.error.set(null);

    return this.getTransactionById(id).pipe(
      map(existing => {
        if (!existing) {
          throw new Error(`Transaction with id ${id} not found`);
        }
        return { ...existing, ...updates, updatedAt: new Date() };
      }),
      delay(300),
      tap(updated => {
        const current = this.transactions$.value;
        const updatedList = current.map(t => t.id === id ? updated : t);
        this.transactions$.next(updatedList);
        this.transactions.set(updatedList);
        this.transactionObserver.notifyUpdated(updated);
      }),
      catchError(err => {
        const errorMsg = 'Error al actualizar la transacción';
        this.error$.next(errorMsg);
        this.error.set(errorMsg);
        const originalTx = this.transactions().find(t => t.id === id);
        if (originalTx) {
          this.transactionObserver.notifyError(originalTx, err.message);
        }
        throw err;
      }),
      tap(() => {
        this.loading$.next(false);
        this.loading.set(false);
      })
    );
  }

  deleteTransaction(id: string): Observable<boolean> {
    this.loading$.next(true);
    this.error$.next(null);
    this.loading.set(true);
    this.error.set(null);

    return of(true).pipe(
      delay(300),
      tap(() => {
        const current = this.transactions$.value;
        const filtered = current.filter(t => t.id !== id);
        this.transactions$.next(filtered);
        this.transactions.set(filtered);
        this.transactionObserver.notifyDeleted(id);
      }),
      catchError(err => {
        const errorMsg = 'Error al eliminar la transacción';
        this.error$.next(errorMsg);
        this.error.set(errorMsg);
        throw err;
      }),
      tap(() => {
        this.loading$.next(false);
        this.loading.set(false);
      })
    );
  }

  private generateTransactionId(): string {
    return `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  formatAmount(amount: number, currency: string = 'USD'): string {
    const symbol = this.appConfig.getCurrencySymbol();
    return `${symbol}${amount.toFixed(2)}`;
  }

  filterTransactions(
    transactions: Transaction[],
    filters: {
      type?: TransactionType;
      status?: TransactionStatus;
      startDate?: Date;
      endDate?: Date;
      minAmount?: number;
      maxAmount?: number;
      category?: string;
    }
  ): Transaction[] {
    return transactions.filter(t => {
      if (filters.type && t.type !== filters.type) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.startDate && t.createdAt < filters.startDate) return false;
      if (filters.endDate && t.createdAt > filters.endDate) return false;
      if (filters.minAmount && t.amount < filters.minAmount) return false;
      if (filters.maxAmount && t.amount > filters.maxAmount) return false;
      if (filters.category && t.category !== filters.category) return false;
      return true;
    });
  }

  sortTransactions(transactions: Transaction[], sortBy: keyof Transaction, ascending: boolean = true): Transaction[] {
    return [...transactions].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      
      const comparison = aVal < bVal ? -1 : 1;
      return ascending ? comparison : -comparison;
    });
  }
}