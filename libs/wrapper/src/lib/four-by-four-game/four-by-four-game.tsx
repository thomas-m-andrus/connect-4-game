import React, { useReducer, useEffect, useState } from 'react';
import { Board, Frame } from '@connect-4-game/ui';
import {
  FourByFourGameReducer,
  actionCreator,
} from '@connect-4-game/game-logic';
import './four-by-four-game.module.scss';
import {
  OccupiedState,
  FooterState,
  GameType,
  GamePhase,
} from '@connect-4-game/types';
import {
  restart,
  determineNextFooterState,
  getPlayerTurn,
  acceptTriggerFromBoard,
  getBoardMessage,
  initial,
} from './utils';
import axios from 'axios';

export function FourByFourGame() {
  const [state, dispatch] = useReducer(FourByFourGameReducer, initial);
  const [footer, setFooter] = useState<FooterState>(restart);
  const playerTurn = getPlayerTurn(state);
  const boardMessage = getBoardMessage(state);
  const handleBoardTrigger = (msg) => {
    if (acceptTriggerFromBoard(footer, playerTurn)) {
      dispatch(actionCreator.takeTurn(playerTurn, msg.payload));
    }
  };
  const handleFrameTrigger = (msg) => {
    setFooter(determineNextFooterState(footer, msg.payload));
  };
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
  useEffect(() => {
    if (
      state.gamePhase === GamePhase.MID &&
      (footer.gameType === GameType.AI_VS_AI ||
        (footer.gameType === GameType.PLAYER_VS_AI &&
          footer.playerVsAIAssignment !== playerTurn))
    ) {
      axios
        .get(
          `https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=${JSON.stringify(
            state.history
          )}`
        )
        .then(({ data }) => {
          dispatch(actionCreator.takeTurn(playerTurn, data[data.length - 1]));
        });
    }
  }, [
    state.history,
    footer.gameType,
    playerTurn,
    footer.playerVsAIAssignment,
    state.gamePhase,
  ]);
  return (
    <Frame
      buttons={footer.buttons}
      trigger={handleFrameTrigger}
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
        trigger={handleBoardTrigger}
        board={state.board}
        state={state.gamePhase}
        message={boardMessage}
      />
    </Frame>
  );
}

export default FourByFourGame;
