export interface car {
  id: number | null;
  name: string;
  color: string;
}

export interface winner {
  id: number;
  wins: number;
  time: number;
}

export interface engine {
  velocity: number;
  distance: number;
}

export interface body {
  time: number;
  wins: number;
}
