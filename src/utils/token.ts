import { randomUUID } from 'crypto';

export function GenerateToken() {
  return randomUUID();
}
