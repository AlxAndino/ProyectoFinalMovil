import { WorkShift } from './task';

export type User = {
  name: string;
  email: string;
  role: string;
  shift: WorkShift;
  area: string;
};
