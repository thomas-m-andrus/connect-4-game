import React, { useReducer, useEffect, useState } from 'react';
import { Board, Frame } from '@connect-4-game/ui';
import {
  createEmptyFourByFourBoard,
  FourByFourGameReducer,
  actionCreator,
} from '@connect-4-game/game-logic';
import './four-by-four-game.module.scss';
import {
  GamePhase,
  GameState,
  OccupiedState,
  FooterState,
  GameType,
} from '@connect-4-game/types';
import { restart, determineNextFooterState, getPlayerTurn } from './utils';

const initial: GameState = {
  board: createEmptyFourByFourBoard(),
  gamePhase: GamePhase.MID,
  history: [],
};
export function FourByFourGame() {
  const [state, dispatch] = useReducer(FourByFourGameReducer, initial);
  const [footer, setFooter] = useState<FooterState>(restart);
  const playerTurn = getPlayerTurn(state);
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
  useEffect(() => {
    if (footer.gameType === GameType.NOT_CHOSEN) {
      dispatch(actionCreator.restartGame());
    }
  }, [footer.gameType]);
  return (
    <Frame
      buttons={footer.buttons}
      trigger={(msg) => {
        setFooter(determineNextFooterState(footer, msg.payload));
      }}
      label={{
        header: {
          currentTurn:
            playerTurn === OccupiedState.PLAYER_1 ? 'Player 1' : 'Player 2',
        },
        footer: {
          instructions: footer.label,
        },
      }}
    >
      <Board
        trigger={(msg) => {
          if (
            ![GameType.NOT_CHOSEN, GameType.AI_VS_AI].includes(
              footer.gameType
            ) &&
            (footer.gameType === GameType.PLAYER_VS_PLAYER ||
              playerTurn === footer.playerVsAIAssignment)
          ) {
            dispatch(actionCreator.takeTurn(playerTurn, msg.payload));
          }
        }}
        board={state.board}
        state={state.gamePhase}
        message={boardMessage}
      />
    </Frame>
  );
}

export default FourByFourGame;
