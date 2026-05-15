import Api from '../api/api.js';
import Progress from '../blocks/progress/progress.js';
import Header from '../blocks/header/header.js';
import Toast from './toast.js';

const DATA_URL = `${import.meta.env.BASE_URL}data`;

export const api = new Api(DATA_URL);

export const progress = new Progress();

export function initLayout(activePage) {
  const header = new Header('.header', activePage);
  header.render(progress.getStats());
  progress.subscribe((stats) => header.render(stats));
  return header;
}

export async function checkAchievements() {
  const achievements = await api.getAchievements();
  const unlocked = progress.evaluateAchievements(achievements);
  unlocked.forEach((achievement) => Toast.achievement(achievement));
}
