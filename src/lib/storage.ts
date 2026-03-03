function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getStorageItem<T = string>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return item as T;
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function removeStorageItem(key: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Silently fail
  }
}
