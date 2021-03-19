import React from 'react';
import { Token } from '../token/token';
import { OccupiedState } from '@connect-4-game/types';
import './board.module.scss';

/* eslint-disable-next-line */
export interface BoardProps {}

export function Board(props: BoardProps) {
  return (
    <div className="board">
      {[
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
      ].map((column) => (
        <div className="board__column">
          {column.reverse().map((token) => (
            <Token state={token}></Token>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
