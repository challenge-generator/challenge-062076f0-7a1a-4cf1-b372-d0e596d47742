import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Transaction } from '../../features/transactions/transaction.model';

/**
 * Tipos de eventos que pueden ser notificados a través del TransactionObserver.
 */
export type TransactionEventType = 'created' | 'updated' | 'deleted' | 'error';

/**
 * Estructura de un evento de transacción.
 */
export interface TransactionEvent {
  type: TransactionEventType;
  transaction: Transaction;
  timestamp: Date;
}

/**
 * Servicio que implementa el patrón Observer para notificar cambios en transacciones.
 * Permite a los componentes suscribirse a eventos de transacciones y reaccionar en consecuencia.
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionObserver {
  private readonly _events = new Subject<TransactionEvent>();

  /**
   * Observable de eventos de transacciones.
   * Los componentes pueden suscribirse para recibir notificaciones.
   */
  readonly events$: Observable<TransactionEvent> = this._events.asObservable();

  /**
   * Notifica un evento de transacción a todos los suscriptores.
   * @param event Evento de transacción a notificar.
   */
  notify(event: TransactionEvent): void {
    this._events.next({
      ...event,
      timestamp: event.timestamp || new Date()
    });
  }

  /**
   * Notifica la creación de una nueva transacción.
   * @param transaction Transacción recién creada.
   */
  notifyCreated(transaction: Transaction): void {
    this.notify({
      type: 'created',
      transaction,
      timestamp: new Date()
    });
  }

  /**
   * Notifica la actualización de una transacción existente.
   * @param transaction Transacción actualizada.
   */
  notifyUpdated(transaction: Transaction): void {
    this.notify({
      type: 'updated',
      transaction,
      timestamp: new Date()
    });
  }

  /**
   * Notifica la eliminación de una transacción.
   * @param transactionId ID de la transacción eliminada.
   */
  notifyDeleted(transactionId: string): void {
    this.notify({
      type: 'deleted',
      transaction: { id: transactionId } as Transaction,
      timestamp: new Date()
    });
  }

  /**
   * Notifica un error relacionado con una transacción.
   * @param transaction Transacción asociada al error.
   * @param error Mensaje de error.
   */
  notifyError(transaction: Transaction, error: string): void {
    this.notify({
      type: 'error',
      transaction,
      timestamp: new Date()
    });
  }
}