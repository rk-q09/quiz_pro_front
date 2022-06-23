import { addDays } from 'date-fns';

const storagePrefix = 'quiz_pro_';

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  getExpires: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}expires`) as string
    );
  },
  setExpires: (expires: number) => {
    const expiresAt = addDays(new Date(), expires);

    window.localStorage.setItem(
      `${storagePrefix}expires`,
      JSON.stringify(expiresAt)
    );
  },
  clearExpires: () => {
    window.localStorage.removeItem(`${storagePrefix}expires`);
  },
};

export default storage;
