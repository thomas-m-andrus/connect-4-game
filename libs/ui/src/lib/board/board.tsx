import React from 'react';
import { Token } from '../token/token';
import { BoardProps } from '@connect-4-game/types';
import './board.module.scss';

export function Board({ board }: BoardProps) {
  return (
    <div className="board">
      {board.map((column) => (
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
