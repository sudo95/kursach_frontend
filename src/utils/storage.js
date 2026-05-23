export const STORAGE_KEY = 'eduquest';

const Storage = {
  load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.error('Storage.load: не удалось прочитать данные', error);
      return fallback;
    }
  },

  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage.save: не удалось сохранить данные', error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage.remove: не удалось удалить данные', error);
    }
  },
};

export default Storage;
