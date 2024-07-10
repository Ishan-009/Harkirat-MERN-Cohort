// simulate updating the state
// user will come and update the state of game, update the array

import { startLogger } from './logger';
import { games } from './store';
startLogger();
setInterval(() => {
  games.push({
    id: Math.random().toString(),
    whitePlayerName: 'Alice',
    blackPlayerName: 'Denzeel',
    moves: [],
  });
}, 5000);

//ws server
// catch event and update the array and logging here howeever we are just simulating event
