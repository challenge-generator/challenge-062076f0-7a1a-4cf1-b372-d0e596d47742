import { Component, OnInit, OnDestroy, signal, computed, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, filter } from 'rxjs';
import { Transaction, TransactionStatus, TransactionType } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionObserver, TransactionEvent, TransactionEventType } from '../../../core/observers/transaction.observer';
import { TransactionCardComponent } from '../../../shared/components/transaction-card/transaction-card.component';

interface TransactionFilter {
  type?: TransactionType;
  status?: TransactionStatus;
  searchTerm?: string;
}

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnInit, OnDestroy {
  readonly transactions = signal<Transaction[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal<TransactionFilter>({});
  readonly sortField = signal<keyof Transaction>('createdAt');
  readonly sortAscending = signal<boolean>(false);

  readonly filteredTransactions = computed(() => {
    let result = this.transactions();
    const currentFilter = this.filter();

    if (currentFilter.type) {
      result = result.filter(t => t.type === currentFilter.type);
    }
    if (currentFilter.status) {
      result = result.filter(t => t.status === currentFilter.status);
    }
    if (currentFilter.searchTerm) {
      const term = currentFilter.searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(term) ||
        t.id.toLowerCase().includes(term) ||
        t.category?.toLowerCase().includes(term)
      );
    }

    return this.sortTransactions(result);
  });

  readonly transactionCount = computed(() => this.filteredTransactions().length);
  readonly totalAmount = computed(() => 
    this.filteredTransactions().reduce((sum, t) => sum + t.amount, 0)
  );

  readonly creditTotal = computed(() => 
    this.filteredTransactions()
      .filter(t => t.type === TransactionType.CREDIT)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly debitTotal = computed(() => 
    this.filteredTransactions()
      .filter(t => t.type === TransactionType.DEBIT)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly recentTransactions = computed(() => 
    [...this.filteredTransactions()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  );

  readonly TransactionType = TransactionType;
  readonly TransactionStatus = TransactionStatus;

  private readonly subscriptions: Subscription[] = [];
  private readonly recentEvents: TransactionEvent[] = [];

  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionObserver: TransactionObserver,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToTransactions();
    this.subscribeToObserverEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.recentEvents.length = 0;
  }

  private subscribeToTransactions(): void {
    const transactionsSub = this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error.set('Error al cargar las transacciones');
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(transactionsSub);

    const loadingSub = this.transactionService.loading$.subscribe({
      next: (loading) => {
        this.loading.set(loading);
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(loadingSub);

    const errorSub = this.transactionService.error$.subscribe({
      next: (err) => {
        this.error.set(err);
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(errorSub);
  }

  private subscribeToObserverEvents(): void {
    const observerSub = this.transactionObserver.events$.pipe(
      filter(event => event.type !== 'error')
    ).subscribe({
      next: (event) => {
        this.recentEvents.unshift(event);
        if (this.recentEvents.length > 10) {
          this.recentEvents.pop();
        }
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(observerSub);
  }

  setFilter(filterUpdate: Partial<TransactionFilter>): void {
    this.filter.update(current => ({ ...current, ...filterUpdate }));
  }

  clearFilters(): void {
    this.filter.set({});
  }

  setSort(field: keyof Transaction): void {
    if (this.sortField() === field) {
      this.sortAscending.update(v => !v);
    } else {
      this.sortField.set(field);
      this.sortAscending.set(true);
    }
  }

  private sortTransactions(transactions: Transaction[]): Transaction[] {
    const field = this.sortField();
    const ascending = this.sortAscending();
    
    return [...transactions].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      
      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
      
      return ascending ? comparison : -comparison;
    });
  }

  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        console.log(`Transaction ${id} deleted successfully`);
      },
      error: (err) => {
        this.error.set('Error al eliminar la transacción');
        console.error('Delete error:', err);
      }
    });
  }

  getStatusClass(status: TransactionStatus): string {
    const statusClasses: Record<TransactionStatus, string> = {
      [TransactionStatus.COMPLETED]: 'status-completed',
      [TransactionStatus.PENDING]: 'status-pending',
      [TransactionStatus.FAILED]: 'status-failed',
      [TransactionStatus.CANCELLED]: 'status-cancelled'
    };
    return statusClasses[status] || 'status-unknown';
  }

  getTypeLabel(type: TransactionType): string {
    return type === TransactionType.CREDIT ? 'Crédito' : 'Débito';
  }

  getEventDescription(event: TransactionEvent): string {
    const typeLabels: Record<TransactionEventType, string> = {
      'created': 'creada',
      'updated': 'actualizada',
      'deleted': 'eliminada',
      'error': 'error'
    };
    return `Transacción ${event.transactionId} ${typeLabels[event.type]}`;
  }

  getRecentEvents(): TransactionEvent[] {
    return this.recentEvents;
  }
}