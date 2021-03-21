import { GameState, OccupiedState, GamePhase } from '@connect-4-game/types';
export const getPlayerExactTurn = (state: GameState) =>
  state.history.length === 0 || state.history.length % 2 === 0
    ? OccupiedState.PLAYER_1
    : OccupiedState.PLAYER_2;
export const getPlayerTurn = (state: GameState) => {
  const currentTurn = getPlayerExactTurn(state);
  const winTurn =
    currentTurn === OccupiedState.PLAYER_1
      ? OccupiedState.PLAYER_2
      : OccupiedState.PLAYER_1;
  return state.gamePhase === GamePhase.WIN ? winTurn : currentTurn;
};
