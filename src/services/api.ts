import axios from 'axios';

const AUTH_KEY = 'auth_basic';
const USER_KEY = 'auth_user';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getStoredAuth = () => {
  return localStorage.getItem(AUTH_KEY) ?? undefined;
};

const setStoredAuth = (value: string | undefined) => {
  if (value) {
    localStorage.setItem(AUTH_KEY, value);
    apiClient.defaults.headers.common.Authorization = value;
  } else {
    localStorage.removeItem(AUTH_KEY);
    delete apiClient.defaults.headers.common.Authorization;
  }
};

export const setCredentials = (username: string, password: string) => {
  const auth = 'Basic ' + btoa(`${username}:${password}`);
  setStoredAuth(auth);
};

export const clearCredentials = () => {
  setStoredAuth(undefined);
  localStorage.removeItem(USER_KEY);
};

export const storeUser = (user: unknown) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const storedAuth = getStoredAuth();
if (storedAuth) {
  apiClient.defaults.headers.common.Authorization = storedAuth;
}

export const verifyCredentials = async (username: string, password: string): Promise<boolean> => {
  try {
    const auth = 'Basic ' + btoa(`${username}:${password}`);
    const testClient = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth,
      },
    });
    await testClient.get('/users/me');
    return true;
  } catch {
    return false;
  }
};

export default apiClient;
