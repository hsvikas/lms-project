export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}