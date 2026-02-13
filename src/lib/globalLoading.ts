import { useSyncExternalStore } from 'react';

let loadingCount = 0;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function startGlobalLoading() {
  loadingCount += 1;
  notify();
}

export function stopGlobalLoading() {
  loadingCount = Math.max(0, loadingCount - 1);
  notify();
}

export function useGlobalLoading(): boolean {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => loadingCount > 0,
    () => false
  );
}
