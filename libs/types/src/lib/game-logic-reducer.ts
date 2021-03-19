import { Board } from './game-logic';

export enum GamePhase {
  MID = 'MID',
  WIN = 'WIN',
  FULL = 'FULL',
}

export interface GameState {
  history: number[];
  board: Board;
  error?: string;
  gamePhase: GamePhase;
}
