import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { AppConfigService } from './core/config/app-config.service';
import { TransactionObserver } from './core/observers/transaction.observer';
import { CalculationContext, TotalAmountStrategy, FeeCalculationStrategy, InterestCalculationStrategy } from './core/strategies/calculation.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: AppConfigService,
      useClass: AppConfigService
    },
    {
      provide: TransactionObserver,
      useClass: TransactionObserver
    },
    {
      provide: CalculationContext,
      useFactory: () => {
        const context = new CalculationContext(new TotalAmountStrategy());
        return context;
      }
    },
    {
      provide: 'CALCULATION_STRATEGIES',
      useValue: {
        total: TotalAmountStrategy,
        fee: FeeCalculationStrategy,
        interest: InterestCalculationStrategy
      }
    },
    {
      provide: 'APP_FEATURES',
      useValue: {
        enableNotifications: true,
        enableDarkMode: true,
        enableAnalytics: false,
        maxTransactionHistory: 100
      }
    },
    {
      provide: 'API_CONFIG',
      useValue: {
        baseUrl: '/api/v1',
        timeout: 30000,
        retryAttempts: 3,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
  ]
};