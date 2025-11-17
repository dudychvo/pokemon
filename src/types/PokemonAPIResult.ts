export interface PokemonAPIResult {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonAPIResultURL[];
}

export interface PokemonAPIResultURL {
  name: string;
  url: string;
}
