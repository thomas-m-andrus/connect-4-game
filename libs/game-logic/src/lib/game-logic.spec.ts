import {
  getColumnLocation,
  getRowLocation,
  createPopulatedBoard,
  fourByFourBoardIsFilled,
  takeTurnInFourByFourGame,
  createEmptyFourByFourBoard,
  getValidOrbitsForFourByFour,
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
    let board = createEmptyFourByFourBoard();
    let testNumber = 1;
    describe.each`
      space | player                    | expected
      ${0}  | ${OccupiedState.PLAYER_1} | ${[['PLAYER_1', 'NONE', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE']]}
      ${2}  | ${OccupiedState.PLAYER_2} | ${[['PLAYER_1', 'NONE', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE'], ['PLAYER_2', 'NONE', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE']]}
      ${0}  | ${OccupiedState.PLAYER_1} | ${[['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE'], ['PLAYER_2', 'NONE', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE']]}
      ${2}  | ${OccupiedState.PLAYER_2} | ${[['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE'], ['PLAYER_2', 'PLAYER_2', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE']]}
      ${1}  | ${OccupiedState.PLAYER_1} | ${[['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['PLAYER_1', 'NONE', 'NONE', 'NONE'], ['PLAYER_2', 'PLAYER_2', 'NONE', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE']]}
      ${2}  | ${OccupiedState.PLAYER_2} | ${[['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['PLAYER_1', 'NONE', 'NONE', 'NONE'], ['PLAYER_2', 'PLAYER_2', 'PLAYER_2', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE']]}
      ${1}  | ${OccupiedState.PLAYER_1} | ${[['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['PLAYER_2', 'PLAYER_2', 'PLAYER_2', 'NONE'], ['NONE', 'NONE', 'NONE', 'NONE']]}
      ${2}  | ${OccupiedState.PLAYER_2} | ${[['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['PLAYER_1', 'PLAYER_1', 'NONE', 'NONE'], ['PLAYER_2', 'PLAYER_2', 'PLAYER_2', 'PLAYER_2'], ['NONE', 'NONE', 'NONE', 'NONE']]}
    `(
      'success scenarios',
      ({
        space,
        player,
        expected,
      }: {
        expected: Board;
        space: number;
        player: OccupiedState.PLAYER_1 | OccupiedState.PLAYER_2;
      }) => {
        it(`Test ${testNumber++}: should return \n             ${JSON.stringify(
          expected
        )}\n             when the board was\n             ${JSON.stringify(
          board
        )}\n             and space was ${space} and player was ${player}`, () => {
          board = takeTurnInFourByFourGame(board, space, player) as Board;
          expect(board).toStrictEqual(expected);
        });
      }
    );
    describe.each`
      input     | expected                                                                                                                                                                                                                                                                                                                                                                                                                                            | len
      ${[0, 0]} | ${{ [`${ColOrbit.RIGHT}______${RowOrbit.MIDDLE}`]: [1, 0], [`${ColOrbit.RIGHT}______${RowOrbit.TOP}`]: [1, 1], [`${ColOrbit.MIDDLE}______${RowOrbit.TOP}`]: [0, 1] }}                                                                                                                                                                                                                                                                               | ${3}
      ${[3, 0]} | ${{ [`${ColOrbit.LEFT}______${RowOrbit.MIDDLE}`]: [2, 0], [`${ColOrbit.LEFT}______${RowOrbit.TOP}`]: [2, 1], [`${ColOrbit.MIDDLE}______${RowOrbit.TOP}`]: [3, 1] }}                                                                                                                                                                                                                                                                                 | ${3}
      ${[0, 3]} | ${{ [`${ColOrbit.MIDDLE}______${RowOrbit.BOTTOM}`]: [0, 2], [`${ColOrbit.RIGHT}______${RowOrbit.BOTTOM}`]: [1, 2], [`${ColOrbit.RIGHT}______${RowOrbit.MIDDLE}`]: [1, 3] }}                                                                                                                                                                                                                                                                         | ${3}
      ${[3, 3]} | ${{ [`${ColOrbit.LEFT}______${RowOrbit.MIDDLE}`]: [2, 3], [`${ColOrbit.LEFT}______${RowOrbit.BOTTOM}`]: [2, 2], [`${ColOrbit.MIDDLE}______${RowOrbit.BOTTOM}`]: [3, 2] }}                                                                                                                                                                                                                                                                           | ${3}
      ${[2, 2]} | ${{ [`${ColOrbit.LEFT}______${RowOrbit.BOTTOM}`]: [1, 1], [`${ColOrbit.LEFT}______${RowOrbit.MIDDLE}`]: [1, 2], [`${ColOrbit.LEFT}______${RowOrbit.TOP}`]: [1, 3], [`${ColOrbit.MIDDLE}______${RowOrbit.TOP}`]: [2, 3], [`${ColOrbit.MIDDLE}______${RowOrbit.BOTTOM}`]: [2, 1], [`${ColOrbit.RIGHT}______${RowOrbit.BOTTOM}`]: [3, 1], [`${ColOrbit.RIGHT}______${RowOrbit.MIDDLE}`]: [3, 2], [`${ColOrbit.RIGHT}______${RowOrbit.TOP}`]: [3, 3] }} | ${8}
    `('getValidOrbitsForFourByFour', ({ input, expected, len }) => {
      it(`should return ${JSON.stringify(
        expected
      )} when input is ${input}`, () => {
        const result = getValidOrbitsForFourByFour(input);
        expect(Object.keys(result).length).toBe(len);
        expect(result).toEqual(expected);
      });
    });
  });
});
