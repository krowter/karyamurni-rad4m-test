export interface Color {
  id: string;
  value: string;
  isPredefined: boolean;
}

export type ColorFilter = (color: Color) => boolean;
