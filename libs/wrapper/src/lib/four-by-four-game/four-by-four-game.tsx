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
import { midGame, playerVsAITurnChoice, restart, buttonLabels } from './utils';

const initial: GameState = {
  board: createEmptyFourByFourBoard(),
  gamePhase: GamePhase.MID,
  history: [],
};
export function FourByFourGame() {
  const [state, dispatch] = useReducer(FourByFourGameReducer, initial);
  const [footer, setFooter] = useState<FooterState>(restart);
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
      buttons={footer.buttons}
      trigger={(msg) => {
        switch (msg.payload) {
          case buttonLabels['RESTART']:
            dispatch(actionCreator.restartGame());
            setFooter(restart);
            break;
          case buttonLabels['PLAYER_VS_PLAYER']:
            setFooter(midGame(GameType.PLAYER_VS_PLAYER));
            break;
          case buttonLabels['PLAYER_VS_AI']:
            setFooter(playerVsAITurnChoice);
            break;
          case buttonLabels['AI_VS_AI']:
            setFooter(midGame(GameType.AI_VS_AI));
            break;
          case buttonLabels['PLAYER_1']:
            setFooter(midGame(GameType.PLAYER_VS_AI, OccupiedState.PLAYER_1));
            break;
          case buttonLabels['PLAYER_2']:
            setFooter(midGame(GameType.PLAYER_VS_AI, OccupiedState.PLAYER_2));
            break;
          default:
            break;
        }
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
          if (footer.gameType !== GameType.NOT_CHOSEN) {
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
