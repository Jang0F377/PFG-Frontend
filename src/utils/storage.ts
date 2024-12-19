export const getLocalStorage = (key: string): string | null => {
  try {
    if (window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (error) {
    console.error('error getting local storage item: ', error);
  }
  return null;
};

export const setLocalStorageItem = (key: string, value: string): void => {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    console.error('error setting local storage item: ', error);
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('error removing local storage item: ', error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    if (window.localStorage) {
      window.localStorage.clear();
    }
  } catch (error) {
    console.error('error clearing local storage: ', error);
  }
};

export const getSessionStorageItem = (key: string): string | null => {
  try {
    if (window.sessionStorage) {
      return window.sessionStorage.getItem(key);
    }
  } catch (error) {
    console.error('error getting session storage item: ', error);
  }
  return null;
};

export const setSessionStorageItem = (key: string, value: string): void => {
  try {
    if (window.sessionStorage) {
      window.sessionStorage.setItem(key, value);
    }
  } catch (error) {
    console.error('error setting session storage item: ', error);
  }
};

export const removeSessionStorageItem = (key: string): void => {
  try {
    if (window.sessionStorage) {
      window.sessionStorage.removeItem(key);
    }
  } catch (error) {
    console.error('error removing session storage item: ', error);
  }
};

export const clearSessionStorage = (): void => {
  try {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
  } catch (error) {
    console.error('error clearing session storage: ', error);
  }
};
