import React from 'react';
import { Board } from './board';
import { OccupiedState } from '@connect-4-game/types';
import { array } from '@storybook/addon-knobs';

export default {
  component: Board,
  title: 'Board',
};

export const primary = () => {
  return (
    <Board
      trigger={(message) => {
        console.log(message);
      }}
      board={[
        array('column 1', [
          'PLAYER_1',
          'PLAYER_1',
          'NONE',
          'NONE',
        ]) as OccupiedState[],
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
