export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
  null='null'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
  null='null'
}
export interface Diary{
    id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
export type NewDiary = Omit<Diary, 'id'>