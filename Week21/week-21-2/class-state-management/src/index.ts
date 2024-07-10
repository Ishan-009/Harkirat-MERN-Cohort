import { startLogger } from './logger';
import { gameManager } from './store';

startLogger();
function main() {
  setInterval(() => {
    gameManager.addGame({
      id: Math.random().toString(),
      blackPlayerName: 'Alice',
      whitePlayerName: 'Bob',
      moves: [],
    });
  }, 5000);
}

main();
