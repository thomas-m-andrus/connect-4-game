import { FooterState, GameType, OccupiedState } from '@connect-4-game/types';

export const buttonLabels = {
  [GameType.PLAYER_VS_PLAYER]: 'Player vs Player',
  [GameType.PLAYER_VS_AI]: 'Player vs AI',
  [GameType.AI_VS_AI]: 'AI vs AI',
  [OccupiedState.PLAYER_1]: 'Go first',
  [OccupiedState.PLAYER_2]: 'Go second',
  RESTART: 'Restart',
};

export const restart: FooterState = {
  gameType: GameType.NOT_CHOSEN,
  buttons: [
    buttonLabels[GameType.PLAYER_VS_PLAYER],
    buttonLabels[GameType.PLAYER_VS_AI],
    buttonLabels[GameType.AI_VS_AI],
  ],
  label: 'Select Game Type:',
};

export const playerVsAITurnChoice: FooterState = {
  gameType: GameType.NOT_CHOSEN,
  buttons: [
    buttonLabels[OccupiedState.PLAYER_1],
    buttonLabels[OccupiedState.PLAYER_2],
  ],
  label: 'Which turn would you like to take:',
};

export const midGame = (
  gameType: GameType,
  playerVsAIAssignment?: FooterState['playerVsAIAssignment']
): FooterState => ({
  gameType,
  buttons: [buttonLabels['RESTART']],
  playerVsAIAssignment,
});
export const determineNextFooterState = (
  state: FooterState,
  button: string
): FooterState => {
  switch (button) {
    case buttonLabels['RESTART']:
      return restart;
    case buttonLabels['PLAYER_VS_PLAYER']:
      return midGame(GameType.PLAYER_VS_PLAYER);
    case buttonLabels['PLAYER_VS_AI']:
      return playerVsAITurnChoice;
    case buttonLabels['AI_VS_AI']:
      return midGame(GameType.AI_VS_AI);
    case buttonLabels['PLAYER_1']:
      return midGame(GameType.PLAYER_VS_AI, OccupiedState.PLAYER_1);
    case buttonLabels['PLAYER_2']:
      return midGame(GameType.PLAYER_VS_AI, OccupiedState.PLAYER_2);
    default:
      return state;
  }
};
