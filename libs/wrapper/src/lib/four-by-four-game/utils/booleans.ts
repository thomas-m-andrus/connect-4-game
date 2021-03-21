import {
  GameState,
  OccupiedState,
  GamePhase,
  FooterState,
  GameType,
} from '@connect-the-tokens-game/types';

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
export const acceptTriggerFromBoard = (
  footer: FooterState,
  playerTurn: OccupiedState.PLAYER_1 | OccupiedState.PLAYER_2
): boolean =>
  ![GameType.NOT_CHOSEN, GameType.AI_VS_AI].includes(footer.gameType) &&
  (footer.gameType === GameType.PLAYER_VS_PLAYER ||
    playerTurn === footer.playerVsAIAssignment);
