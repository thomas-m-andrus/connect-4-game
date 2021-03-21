import { Action, ActionType, actionCreator } from './action';
import {
  createEmptyFourByFourBoard,
  getWinningCoordinatesFourByFour,
  takeTurnInFourByFourGame,
  fourByFourBoardIsFilled,
} from '../game-logic';
import {
  OccupiedState,
  GameMessage,
  GamePhase,
  GameState as State,
} from '@connect-the-tokens-game/types';

export const FourByFourGameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.RESTART_GAME:
      return {
        ...state,
        history: [],
        board: createEmptyFourByFourBoard(),
        error: undefined,
        gamePhase: GamePhase.MID,
      };
    case ActionType.TAKE_TURN: {
      const {
        payload: { player, col },
      } = action;
      const rightPlayer =
        state.history.length % 2 === 0
          ? OccupiedState.PLAYER_1
          : OccupiedState.PLAYER_2;
      const playerIsCorrect = rightPlayer === player;
      if (playerIsCorrect && state.gamePhase === GamePhase.MID) {
        const update = takeTurnInFourByFourGame(state.board, col, player);
        if (update.type === GameMessage.TURN_TAKEN) {
          const history = [...state.history, col];
          const { board, coordinateUpdated } = update;
          const winningPaths = getWinningCoordinatesFourByFour(
            board,
            coordinateUpdated
          );
          const gamePhase =
            winningPaths.length > 0
              ? GamePhase.WIN
              : fourByFourBoardIsFilled(board)
              ? GamePhase.FULL
              : GamePhase.MID;
          return { ...state, board, history, gamePhase };
        } else {
          return { ...state, error: update.message };
        }
      } else {
        return {
          ...state,
          error: !playerIsCorrect
            ? 'That was an illegal move.'
            : `Restart the game.`,
        };
      }
    }
    case ActionType.CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return { ...state };
  }
};

export { actionCreator };
