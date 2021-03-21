import { OccupiedState } from './game-logic';
import { FrameProps } from './frame';
export enum GameType {
  PLAYER_VS_PLAYER = 'PLAYER_VS_PLAYER',
  PLAYER_VS_AI = 'PLAYER_VS_AI',
  AI_VS_AI = 'AI_VS_AI',
  NOT_CHOSEN = 'NOT_CHOSEN',
}

export interface FooterState {
  gameType: GameType;
  playerVsAIAssignment?: OccupiedState.PLAYER_1 | OccupiedState.PLAYER_2;
  buttons: FrameProps['buttons'];
  label?: string;
}
