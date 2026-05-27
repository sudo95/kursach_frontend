import '../styles/global.css';
import '../blocks/header/header.css';
import '../blocks/footer/footer.css';
import '../blocks/profile/profile.css';
import '../blocks/achievements/achievements.css';
import '../styles/toast.css';

import {
  api,
  progress,
  initLayout,
  checkAchievements,
} from '../utils/bootstrap.js';
import Profile from '../blocks/profile/profile.js';
import Achievements from '../blocks/achievements/achievements.js';

async function main() {
  initLayout('profile');
  await checkAchievements();

  const profileView = new Profile('.js-profile');
  const achievementsView = new Achievements(
    '.js-recent-achievements',
    progress,
  );

  try {
    const achievements = await api.getAchievements();
    render(profileView, achievementsView, achievements);
  } catch (error) {
    console.error(error);
    document.querySelector('.js-profile').innerHTML =
      '<p class="error-message">Не удалось загрузить профиль.</p>';
  }
}

function render(profileView, achievementsView, achievements) {
  const stats = progress.getStats();
  profileView.render(stats, achievements.length);
  profileView.onReset(() => {
    progress.reset();
    render(profileView, achievementsView, achievements);
  });

  const unlocked = achievements.filter((a) =>
    progress.isAchievementUnlocked(a.code),
  );
  achievementsView.render(
    unlocked.length ? unlocked.slice(-3) : achievements.slice(0, 3),
  );
}

main();
