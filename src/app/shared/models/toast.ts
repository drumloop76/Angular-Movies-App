export enum EventTypes {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}
