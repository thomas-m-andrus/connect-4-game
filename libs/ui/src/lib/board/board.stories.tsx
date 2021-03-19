import React from 'react';
import { Board, BoardProps } from './board';

export default {
  component: Board,
  title: 'Board',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: BoardProps = {};

  return <Board />;
};
