import React from 'react';
import { Token } from '../token/token';
import { BoardProps, TriggerType } from '@connect-4-game/types';
import './board.module.scss';

export function Board({ board, trigger }: BoardProps) {
  const handleClickColumn: (
    index: number
  ) => React.MouseEventHandler<HTMLDivElement> = (index: number) => {
    return () => trigger({ type: TriggerType.CLICK_COLUMN, payload: index });
  };
  return (
    <div className="board">
      {board.map((column, index) => (
        <div
          key={`board__column--${index}`}
          className="board__column"
          onClick={handleClickColumn(index)}
        >
          {column.reverse().map((token, tokenIndex) => (
            <Token
              key={`board__col--${index}__token--${tokenIndex}`}
              state={token}
            ></Token>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
