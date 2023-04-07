export function subscribe(callback: { (this: Window, ev: Event): unknown }) {
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('storage', callback);
  };
}
