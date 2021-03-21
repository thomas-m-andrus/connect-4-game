import { GameState, GamePhase } from '@connect-4-game/types';
import { createEmptyFourByFourBoard } from '@connect-4-game/game-logic';

export const getBoardMessage = (state: GameState): string | undefined =>
  state.gamePhase === GamePhase.WIN
    ? 'Win!'
    : state.gamePhase === GamePhase.FULL
    ? 'Draw!'
    : state.error;

export const initial: GameState = {
  board: createEmptyFourByFourBoard(),
  gamePhase: GamePhase.MID,
  history: [],
};
