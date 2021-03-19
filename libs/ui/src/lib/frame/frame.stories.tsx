import React from 'react';
import { Frame } from './frame';

export default {
  component: Frame,
  title: 'Pure UI/Frame',
};

export const primary = () => {
  return (
    <Frame
      buttons={['restart', 'happy times']}
      label={{ header: { currentTurn: 'Player 1' } }}
      trigger={(msg) => {
        console.log(msg.payload);
      }}
    >
      <div>something in the middle</div>
    </Frame>
  );
};
