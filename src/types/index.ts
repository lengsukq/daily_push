export interface EnvItem {
  id?: number;
  name: string;
  value: string;
  remarks?: string;
  status?: number;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface QLConnection {
  id?: number;
  name: string;
  url: string;
  clientId: string;
  clientSecret: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DailyPushConfig {
  fullInLoveDate: string;
  birthday: string;
  birthday2: string;
  location: string;
  adm: string;
  key: string;
  weatherIndex: number;
  oneType: string;
  templateId: string;
  name: string;
  name2?: string;
  appId: string;
  appSecret: string;
  toUser: string[];
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  detail?: string;
}
