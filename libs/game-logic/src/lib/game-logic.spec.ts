import {
  getColumnLocation,
  getRowLocation,
  boardIsFilled,
  createPopulatedBoard,
  fourByFourBoardIsFilled,
} from './game-logic';
import { ColOrbit, RowOrbit, OccupiedState } from '@connect-4-game/types';

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
});
