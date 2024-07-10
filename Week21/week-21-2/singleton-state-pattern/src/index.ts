import { startLogger } from './logger';
import { GameManager } from './store';

startLogger();
function main() {
  setInterval(() => {
    GameManager.getInstance().addGame({
      id: Math.random().toString(),
      blackPlayerName: 'Alice',
      whitePlayerName: 'Bob',
      moves: [],
    });
  }, 5000);
}

main();
