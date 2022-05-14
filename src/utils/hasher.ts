/* eslint-disable prettier/prettier */
import { createHash } from 'crypto';

export function Hash(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export function Compare(password: string, hash: string): boolean {
  return createHash('sha256').update(password).digest('hex') === hash;
}