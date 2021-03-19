import React from 'react';
import { Frame, FrameProps } from './frame';

export default {
  component: Frame,
  title: 'Frame',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: FrameProps = {};

  return <Frame />;
};
