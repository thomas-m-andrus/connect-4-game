import { getColumnLocation, getRowLocation } from './game-logic';
import { ColOrbit } from '@connect-4-game/types';

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
});
