/**
 * Centralized Error Handling
 * PlayNexus Sonic Forge 24
 */

import { toast } from 'sonner';

export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export interface AppError {
  message: string;
  severity: ErrorSeverity;
  code?: string;
  details?: unknown;
  timestamp: Date;
}

/**
 * Centralized error logger with user-friendly messaging
 */
export class ErrorHandler {
  private static errors: AppError[] = [];
  private static readonly MAX_ERRORS = 100;

  /**
   * Handle and log an error with user notification
   */
  static handle(
    error: Error | string,
    severity: ErrorSeverity = ErrorSeverity.ERROR,
    showToast: boolean = true
  ): void {
    const appError: AppError = {
      message: typeof error === 'string' ? error : error.message,
      severity,
      details: error instanceof Error ? error.stack : undefined,
      timestamp: new Date()
    };

    // Store error (with limit)
    this.errors.push(appError);
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.shift();
    }

    // Console logging (development only)
    if (import.meta.env.DEV) {
      const logFn = severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.ERROR 
        ? console.error 
        : console.warn;
      logFn('[ErrorHandler]', appError);
    }

    // User notification
    if (showToast) {
      const toastFn = severity === ErrorSeverity.INFO 
        ? toast.info 
        : severity === ErrorSeverity.WARNING 
        ? toast.warning 
        : toast.error;

      toastFn(appError.message, {
        description: severity === ErrorSeverity.CRITICAL 
          ? 'Please contact support if this persists.' 
          : undefined
      });
    }
  }

  /**
   * Get recent errors for diagnostics
   */
  static getErrors(): AppError[] {
    return [...this.errors];
  }

  /**
   * Clear error history
   */
  static clearErrors(): void {
    this.errors = [];
  }

  /**
   * Export errors for support
   */
  static exportErrors(): string {
    return JSON.stringify(this.errors, null, 2);
  }
}

/**
 * Async error boundary wrapper
 */
export async function tryAsync<T>(
  fn: () => Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    ErrorHandler.handle(
      error instanceof Error ? error : new Error(String(error)),
      ErrorSeverity.ERROR
    );
    return null;
  }
}

/**
 * Sync error boundary wrapper
 */
export function trySync<T>(
  fn: () => T,
  errorMessage: string = 'An error occurred'
): T | null {
  try {
    return fn();
  } catch (error) {
    ErrorHandler.handle(
      error instanceof Error ? error : new Error(String(error)),
      ErrorSeverity.ERROR
    );
    return null;
  }
}
