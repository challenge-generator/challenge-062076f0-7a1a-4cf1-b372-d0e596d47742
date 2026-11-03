import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Transaction, TransactionType, TransactionStatus } from '../../../features/transactions/transaction.model';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCardComponent {
  @Input({ required: true }) transaction!: Transaction;
  @Input() showActions: boolean = true;
  @Input() compactMode: boolean = false;
  @Output() cardClick = new EventEmitter<Transaction>();
  @Output() deleteClick = new EventEmitter<Transaction>();
  @Output() editClick = new EventEmitter<Transaction>();

  readonly isCredit = computed(() => this.transaction?.type === 'credit');
  readonly isPending = computed(() => this.transaction?.status === 'pending');
  readonly isCompleted = computed(() => this.transaction?.status === 'completed');
  readonly isFailed = computed(() => this.transaction?.status === 'failed');
  readonly formattedAmount = computed(() => this.formatAmount());
  readonly statusColor = computed(() => this.getStatusColor());
  readonly typeIcon = computed(() => this.getTypeIcon());
  readonly formattedDate = computed(() => this.formatDate());

  private formatAmount(): string {
    if (!this.transaction) return '';
    const sign = this.transaction.type === 'credit' ? '+' : '-';
    return `${sign}$${this.transaction.amount.toFixed(2)} ${this.transaction.currency}`;
  }

  private getStatusColor(): string {
    const colors: Record<TransactionStatus, string> = {
      pending: 'warn',
      completed: 'primary',
      failed: 'accent',
      cancelled: ''
    };
    return colors[this.transaction?.status] || '';
  }

  private getTypeIcon(): string {
    return this.transaction?.type === 'credit' ? 'arrow_downward' : 'arrow_upward';
  }

  private formatDate(): string {
    if (!this.transaction?.createdAt) return '';
    const date = new Date(this.transaction.createdAt);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onCardClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button')) return;
    this.cardClick.emit(this.transaction);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClick.emit(this.transaction);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.editClick.emit(this.transaction);
  }

  getCategoryClass(): string {
    const categoryMap: Record<string, string> = {
      'food': 'category-food',
      'transport': 'category-transport',
      'shopping': 'category-shopping',
      'entertainment': 'category-entertainment',
      'utilities': 'category-utilities',
      'health': 'category-health',
      'general': 'category-general'
    };
    return categoryMap[this.transaction?.category] || 'category-general';
  }
}