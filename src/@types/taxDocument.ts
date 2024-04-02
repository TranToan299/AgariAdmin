import { TYPE_EVENT } from '../constants/app.constants';

export type IEventCommon = {
  id: number;
  content: string;
  type: TYPE_EVENT;
};

export type IEventStore = {
  event: IEventCommon;
};
