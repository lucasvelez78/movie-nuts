export type Movies = {
  adult: boolean;
  id: number;
  original_language: string;
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
}[];

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  adult?: boolean;
  overview?: string;
  vote_average?: number;
  videos?: {
    results: {
      name: string;
      key: string;
    }[];
  };
};

export type Cast = {
  name: string;
  character: string;
  profile_path?: string;
}[];
