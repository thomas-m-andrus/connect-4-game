import { OccupiedState } from '@connect-4-game/types';

export enum ActionType {
  TAKE_TURN = 'TAKE_TURN',
  RESTART_GAME = 'RESTART_GAME',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

export interface TakeTurnAction {
  type: ActionType.TAKE_TURN;
  payload: {
    player: OccupiedState.PLAYER_1 | OccupiedState.PLAYER_2;
    col: number;
  };
}

export interface RestartAction {
  type: ActionType.RESTART_GAME;
}

export interface ClearErrorAction {
  type: ActionType.CLEAR_ERROR;
}

export type Action = TakeTurnAction | RestartAction | ClearErrorAction;

const takeTurn = (
  player: TakeTurnAction['payload']['player'],
  col: TakeTurnAction['payload']['col']
): TakeTurnAction => ({ type: ActionType.TAKE_TURN, payload: { col, player } });

const restartGame = (): RestartAction => ({ type: ActionType.RESTART_GAME });

const clearError = (): ClearErrorAction => ({
  type: ActionType.CLEAR_ERROR,
});

export const actionCreator = { takeTurn, restartGame, clearError };
