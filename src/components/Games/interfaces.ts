export interface IGameInfo {
  id: number;
  name: string;
  description: string;
  languages: string;
  headerImg: string;
  website: string | null;
  screenshots?: {
    id: number;
    path_full: string;
    path_thumbnail: string;
  }[];
  releaseDate?: {
    coming_soon: boolean;
    date: string;
  };
  backgroundImg?: string;
  movies?: {
    id: number;
    name: string;
    thumbnail: string;
    webm: { "480": string; max: string };
    highlight: boolean;
  }[];
}
