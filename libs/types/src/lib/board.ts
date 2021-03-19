import { Board } from './game-logic';
import { GamePhase } from './game-logic-reducer';

export enum TriggerType {
  CLICK_COLUMN = 'CLICK_COLUMN',
}
export interface TriggerAction {
  type: TriggerType;
  payload: number;
}
export interface BoardProps {
  state: GamePhase;
  message?: string;
  board: Board;
  trigger: (triggerAction: TriggerAction) => void;
}
