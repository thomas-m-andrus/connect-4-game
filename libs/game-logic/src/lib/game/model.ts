import { Board } from '@connect-4-game/types';

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
