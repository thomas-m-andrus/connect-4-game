import React from 'react';

import './token.module.scss';

/* eslint-disable-next-line */
export interface TokenProps {}

export function Token(props: TokenProps) {
  return <div className={`token token--empty`} />;
}

export default Token;
