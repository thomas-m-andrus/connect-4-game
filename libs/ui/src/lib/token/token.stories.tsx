import React from 'react';
import { Token } from './token';
import { OccupiedState } from '@connect-4-game/types';
import { select } from '@storybook/addon-knobs';

export default {
  component: Token,
  title: 'Pure UI/Token',
};

export const primary = () => {
  return <Token state={select('state', OccupiedState, OccupiedState.NONE)} />;
};
