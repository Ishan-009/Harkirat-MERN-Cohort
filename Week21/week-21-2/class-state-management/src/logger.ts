import { gameManager } from './store';

export const startLogger = () => {
  setInterval(() => {
    gameManager.logState();
  }, 4000);
};
