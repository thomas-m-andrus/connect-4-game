import React from 'react';
import { FourByFourGame, FourByFourGameProps } from './four-by-four-game';

export default {
  component: FourByFourGame,
  title: 'FourByFourGame',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: FourByFourGameProps = {};

  return <FourByFourGame />;
};
