export interface AppConfigFeatures {
  enableNotifications: boolean;
  enableDarkMode: boolean;
  enableAnalytics: boolean;
  enableExperimentalFeatures: boolean;
  maxTransactionHistory: number;
  defaultPageSize: number;
}

export interface AppConfig {
  currency: string;
  currencySymbol: string;
  locale: string;
  language: string;
  theme: 'light' | 'dark' | 'auto';
  apiUrl: string;
  apiTimeout: number;
  retryAttempts: number;
  features: AppConfigFeatures;
  dateFormat: string;
  timeFormat: string;
  decimalSeparator: string;
  thousandsSeparator: string;
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  currency: 'USD',
  currencySymbol: '$',
  locale: 'en-US',
  language: 'en',
  theme: 'light',
  apiUrl: '/api',
  apiTimeout: 30000,
  retryAttempts: 3,
  features: {
    enableNotifications: true,
    enableDarkMode: true,
    enableAnalytics: false,
    enableExperimentalFeatures: false,
    maxTransactionHistory: 100,
    defaultPageSize: 10
  },
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm',
  decimalSeparator: '.',
  thousandsSeparator: ','
};

export type ThemeMode = 'light' | 'dark' | 'auto';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'ARS';