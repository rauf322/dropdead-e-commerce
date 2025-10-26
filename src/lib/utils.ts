import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { $ZodIssue } from 'zod/v4/core';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Convert prisma object into regular JS object

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

//Format errors

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === 'ZodError') {
    //Handle Zod error
    const fieldErrors = error.issues.map((issue: $ZodIssue) => issue.message);
    return fieldErrors.join('. ');
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    const field = error.meta?.target ? error.meta.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exist`;
  } else {
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  }
}

//Round number to two decimal places

export function round2(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }
}

const CURRECY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
});

//Format currency

export function formatCurrency(value: number | string): string {
  value = Number(value);
  if (isNaN(value)) return '';
  return CURRECY_FORMATTER.format(value);
}
