import React from 'react';

import './frame.module.scss';

import { FrameProps, FrameTriggerType } from '@connect-the-tokens-game/types';

export function Frame({ label, children, buttons, trigger }: FrameProps) {
  const handleButtonClick = (buttonName: string) => () =>
    trigger({ type: FrameTriggerType.BUTTON_CLICK, payload: buttonName });
  return (
    <div className={`frame`}>
      <div className={`frame__header-panel`}>
        <div
          className={`frame__header-text`}
        >{`Turn: ${label.header.currentTurn}`}</div>
      </div>
      <div className={`frame__body-panel`}>{children}</div>
      <div className={`frame__footer-panel`}>
        {label.footer.instructions && <div>{label.footer.instructions}</div>}
        {buttons.map((buttonLabel, idx) => (
          <button
            key={`frame__button frame__button--${buttonLabel}-${idx}`}
            onClick={handleButtonClick(buttonLabel)}
          >
            {buttonLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Frame;
