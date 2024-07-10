import { games } from './store';

// every itnerval log the state of the server
export function startLogger() {
  setInterval(() => {
    console.log(games);
  }, 5000);
}
