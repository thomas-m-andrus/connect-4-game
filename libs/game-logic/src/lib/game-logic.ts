import {
  Board,
  OccupiedState,
  ColOrbit,
  RowOrbit,
  GameMessage,
  GameErrorMessage,
} from '@connect-4-game/types';

export const getColumnLocation = (orbit: ColOrbit, start: number): number => {
  const moveTo: Record<ColOrbit, number> = {
    LEFT: -1,
    MIDDLE_Col: 0,
    RIGHT: 1,
  };
  return start + moveTo[orbit];
};

export const getRowLocation = (orbit: RowOrbit, start: number): number => {
  const moveTo: Record<RowOrbit, number> = {
    TOP: 1,
    MIDDLE_ROW: 0,
    BOTTOM: -1,
  };
  return start + moveTo[orbit];
};

export const boardIsFilled = (
  rows: number,
  columns: number
): ((board: Board) => boolean) => {
  return (board: Board) => {
    const boardSection = board.slice(0, columns);
    return !boardSection.some((col) =>
      col.slice(0, rows).includes(OccupiedState.NONE)
    );
  };
};

export const fourByFourBoardIsFilled = boardIsFilled(4, 4);

export const createPopulatedBoard = (
  rows: number,
  columns: number,
  populated: OccupiedState
): Board => {
  return Array.from({ length: columns }, () =>
    Array.from({ length: rows }, () => populated)
  );
};

export const createEmptyFourByFourBoard = (): Board =>
  createPopulatedBoard(4, 4, OccupiedState.NONE);

export const takeTurn = (
  rows: number,
  columns: number
): ((
  board: Board,
  col: number,
  player: OccupiedState.PLAYER_1 | OccupiedState.PLAYER_2
) => Board | GameErrorMessage) => {
  return (
    board: Board,
    col: number,
    player: OccupiedState.PLAYER_1 | OccupiedState.PLAYER_2
  ): Board | GameErrorMessage => {
    if (col < 0 || col >= columns)
      return { type: GameMessage.ERROR, message: 'Invalid attempt' };
    const columnUpdate = [...board[col].slice(0, rows)];
    const updatedLocation = columnUpdate.indexOf(OccupiedState.NONE);
    if (updatedLocation < 0)
      return {
        type: GameMessage.ERROR,
        message: 'No empty spaces available in chosen column',
      };
    columnUpdate[updatedLocation] = player;
    const updatedBoard = [...board];
    updatedBoard[col] = columnUpdate;
    return updatedBoard;
  };
};

export const takeTurnInFourByFourGame = takeTurn(4, 4);
