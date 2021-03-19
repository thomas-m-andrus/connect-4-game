import React from 'react';
import { Token, TokenProps } from './token';

export default {
  component: Token,
  title: 'Token',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: TokenProps = {};

  return <Token />;
};
