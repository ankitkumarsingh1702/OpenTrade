export function isValidEmail(value: string): boolean {
  const normalized = value.trim();

  if (normalized.length > 254 || normalized.length === 0) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(normalized);
}
