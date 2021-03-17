import {
  getColumnLocation,
  getRowLocation,
  createPopulatedBoard,
  fourByFourBoardIsFilled,
  takeTurnInFourByFourGame,
  createEmptyFourByFourBoard,
} from './game-logic';
import {
  ColOrbit,
  RowOrbit,
  OccupiedState,
  GameMessage,
  Board,
  GameErrorMessage,
} from '@connect-4-game/types';

describe('gameLogic', () => {
  describe('getColumnLocation', () => {
    it.each`
      input              | expected
      ${ColOrbit.LEFT}   | ${0}
      ${ColOrbit.MIDDLE} | ${1}
      ${ColOrbit.RIGHT}  | ${2}
    `(
      'should return $expected when orbit input is $input and location is 1.',
      ({ input, expected }) => {
        const result = getColumnLocation(input, 1);
        expect(result).toBe(expected);
      }
    );
  });
  describe('getRowLocation', () => {
    it.each`
      input              | expected
      ${RowOrbit.BOTTOM} | ${0}
      ${RowOrbit.MIDDLE} | ${1}
      ${RowOrbit.TOP}    | ${2}
    `(
      'should return $expected when orbit input is $input and location is 1.',
      ({ input, expected }) => {
        const result = getRowLocation(input, 1);
        expect(result).toBe(expected);
      }
    );
  });
  describe('fourByFourBoardIsFilled', () => {
    it.each`
      input                     | expected
      ${OccupiedState.PLAYER_1} | ${true}
      ${OccupiedState.PLAYER_2} | ${true}
      ${OccupiedState.NONE}     | ${false}
    `(
      'should return $expected when input is a four by four matrix filled with $input.',
      () => {
        const dumb = createPopulatedBoard(4, 4, OccupiedState.PLAYER_1);
        const result = fourByFourBoardIsFilled(dumb);
        expect(result).toBe(true);
      }
    );
  });
  describe('takeTurnInFourByFourGame', () => {
    describe('error scenarios', () => {
      it.each`
        input                                                                                                                                                                        | inputStr                                                                              | expected                                                                              | expectedStr
        ${[createEmptyFourByFourBoard(), -1, OccupiedState.PLAYER_1]}                                                                                                                | ${'board is four by four and empty and -1 as turn space.'}                            | ${{ type: GameMessage.ERROR, message: 'Invalid attempt' }}                            | ${`'Invalid attempt'`}
        ${[createEmptyFourByFourBoard(), 4, OccupiedState.PLAYER_1]}                                                                                                                 | ${'board is four by four and empty and 4 as turn space.'}                             | ${{ type: GameMessage.ERROR, message: 'Invalid attempt' }}                            | ${`'Invalid attempt'`}
        ${[[[OccupiedState.PLAYER_1, OccupiedState.PLAYER_2, OccupiedState.PLAYER_2, OccupiedState.PLAYER_1], ...createEmptyFourByFourBoard().slice(1)], 0, OccupiedState.PLAYER_1]} | ${'board is four by four and empty except for the first column and 0 as turn space.'} | ${{ type: GameMessage.ERROR, message: 'No empty spaces available in chosen column' }} | ${`No empty spaces available in chosen column`}
      `(
        'should return error message of $expectedStr when $inputStr',
        ({
          input,
          expected,
        }: {
          input: [Board, number, OccupiedState.PLAYER_1];
          expected: GameErrorMessage;
        }) => {
          const result = takeTurnInFourByFourGame(...input);
          expect(result).toEqual(expected);
        }
      );
    });
    describe('success scenarios', () => {
      let board = createEmptyFourByFourBoard();
      it('', () => {
        board = takeTurnInFourByFourGame(
          board,
          0,
          OccupiedState.PLAYER_1
        ) as Board;

        expect(board).toStrictEqual([
          ['PLAYER_1', 'NONE', 'NONE', 'NONE'],
          ['NONE', 'NONE', 'NONE', 'NONE'],
          ['NONE', 'NONE', 'NONE', 'NONE'],
          ['NONE', 'NONE', 'NONE', 'NONE'],
        ]);
      });
    });
  });
});
