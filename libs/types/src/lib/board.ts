import { Board } from './game-logic';

export enum TriggerType {
  CLICK_COLUMN = 'CLICK_COLUMN',
}
export interface TriggerAction {
  type: TriggerType;
  payload: number;
}
export interface BoardProps {
  board: Board;
  trigger: (triggerAction: TriggerAction) => void;
}
