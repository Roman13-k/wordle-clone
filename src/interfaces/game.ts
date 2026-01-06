export interface KeysI {
  value: string | React.ReactNode;
  onClick: () => void;
}

export interface DailyWordI {
  id:string;
  date:string;
  word:string;
}
