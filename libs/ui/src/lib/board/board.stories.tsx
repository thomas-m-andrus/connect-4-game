import React from 'react';
import { Board } from './board';
import { OccupiedState, GamePhase } from '@connect-4-game/types';
import { array, select, text } from '@storybook/addon-knobs';

export default {
  component: Board,
  title: 'Pure UI/Board',
};

export const primary = () => {
  return (
    <Board
      state={select('game state', GamePhase, GamePhase.MID)}
      message={text('message', 'This is a message')}
      trigger={(message) => {
        console.log(message);
      }}
      board={[
        [
          OccupiedState.PLAYER_1,
          OccupiedState.PLAYER_1,
          OccupiedState.NONE,
          OccupiedState.NONE,
        ],
        [
          OccupiedState.PLAYER_1,
          OccupiedState.PLAYER_1,
          OccupiedState.NONE,
          OccupiedState.NONE,
        ],
        [
          OccupiedState.PLAYER_2,
          OccupiedState.PLAYER_2,
          OccupiedState.PLAYER_2,
          OccupiedState.PLAYER_2,
        ],
        [
          OccupiedState.NONE,
          OccupiedState.NONE,
          OccupiedState.NONE,
          OccupiedState.NONE,
        ],
      ]}
    />
  );
};
