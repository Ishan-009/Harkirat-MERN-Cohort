import { GameManager } from './store';

export const startLogger = () => {
  setInterval(() => {
    GameManager.getInstance().logState();
  }, 4000);
};
