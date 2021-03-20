import React, { useReducer, useEffect } from 'react';
import { Board, Frame } from '@connect-4-game/ui';
import {
  createEmptyFourByFourBoard,
  FourByFourGameReducer,
  actionCreator,
} from '@connect-4-game/game-logic';
import './four-by-four-game.module.scss';
import { GamePhase, GameState, OccupiedState } from '@connect-4-game/types';

/* eslint-disable-next-line */
export interface FourByFourGameProps {}

const initial: GameState = {
  board: createEmptyFourByFourBoard(),
  gamePhase: GamePhase.MID,
  history: [],
};

export function FourByFourGame(props: FourByFourGameProps) {
  const [state, dispatch] = useReducer(FourByFourGameReducer, initial);
  const playerTurn =
    state.history.length === 0 || state.history.length % 2 === 0
      ? OccupiedState.PLAYER_1
      : OccupiedState.PLAYER_2;
  const boardMessage =
    state.gamePhase === GamePhase.WIN
      ? 'Win!'
      : state.gamePhase === GamePhase.FULL
      ? 'Draw!'
      : state.error;
  useEffect(() => {
    if (state.error !== undefined) {
      setTimeout(() => {
        dispatch(actionCreator.clearError());
      }, 1000);
    }
  }, [state.error]);
  return (
    <Frame
      buttons={['restart']}
      trigger={(msg) => {
        if (msg.payload === 'restart') {
          dispatch(actionCreator.restartGame());
        }
      }}
      label={{
        header: {
          currentTurn:
            playerTurn === OccupiedState.PLAYER_1 ? 'Player 1' : 'Player 2',
        },
      }}
    >
      <Board
        trigger={(msg) => {
          dispatch(actionCreator.takeTurn(playerTurn, msg.payload));
        }}
        board={state.board}
        state={state.gamePhase}
        message={boardMessage}
      />
    </Frame>
  );
}

export default FourByFourGame;
