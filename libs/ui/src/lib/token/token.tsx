import React from 'react';
import { TokenProps, OccupiedState } from '@connect-4-game/types';

import './token.module.scss';

export function Token({ state }: TokenProps) {
  const mutation = {
    [OccupiedState.NONE]: 'token--empty',
    [OccupiedState.PLAYER_1]: 'token--player-1',
    [OccupiedState.PLAYER_2]: 'token--player-2',
  };
  return <div className={`token ${mutation[state]}`} />;
}

export default Token;
