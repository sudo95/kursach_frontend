import '../styles/global.css';
import '../blocks/header/header.css';
import '../blocks/footer/footer.css';
import '../blocks/achievements/achievements.css';
import '../styles/toast.css';

import {
  api,
  progress,
  initLayout,
  checkAchievements,
} from '../utils/bootstrap.js';
import Achievements from '../blocks/achievements/achievements.js';

async function main() {
  initLayout('achievements');
  await checkAchievements();

  const view = new Achievements('.js-achievements', progress);

  try {
    const achievements = await api.getAchievements();
    view.render(achievements);
    renderSummary(achievements);
  } catch (error) {
    console.error(error);
    document.querySelector('.js-achievements').innerHTML =
      '<p class="error-message">Не удалось загрузить достижения.</p>';
  }
}

function renderSummary(achievements) {
  const stats = progress.getStats();
  const summary = document.querySelector('.js-achievements-summary');
  if (summary) {
    summary.textContent = `Открыто ${stats.unlockedAchievements.length} из ${achievements.length}`;
  }
}

main();
