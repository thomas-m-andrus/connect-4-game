import { PropsWithChildren } from 'react';

export enum FrameTriggerType {
  BUTTON_CLICK = 'BUTTON_CLICK',
}

export interface FrameTriggerAction {
  type: FrameTriggerType;
  payload: Button;
}
export type Button = string;

export interface FrameBaseProps {
  label: { header: { currentTurn: string }, footer:{instructions?:string} };
  buttons: Button[];
  trigger: (msg: FrameTriggerAction) => void;
}

export type FrameProps = PropsWithChildren<FrameBaseProps>;
