interface Game {
  id: string;
  whitePlayerName: string;
  blackPlayerName: string;
  moves: string[];
}

class GameManager {
  private games: Game[] = [];

  public getGames() {
    return this.games;
  }

  public addMoves(gameId: string, move: string) {
    const game = this.games.find((game) => game.id === gameId);
    if (game) {
      game.moves.push(move);
      console.log(`the ${move} is added to ${game?.id}`);
    }
  }

  public addGame(game: Game) {
    this.games.push(game);
  }

  public logState() {
    console.log('Log Game Status:- ', this.games);
  }
}

// one is that you use new instance in different files like in index.ts for having registering game moves, getting moves and all, and one instance in log file for logging. Here there will be two different isntances crated for a single game.

// other way is to export single instance fromt this file and use it in other different files

export const gameManager = new GameManager();
