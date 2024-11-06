export type SearchState = {
  queryText: string;
  queryParams: string;
  history: string[];
};

export type GetPokemonPayload = {
  name?: string;
  page?: number;
  limit?: number;
};

export type PokemonBasic = {
  id: number;
  name: string;
  types: string[];
  color: string;
  shape: string;
  icon: string[];
};

export type GetPokemonRes = {
  pagination: {
    pageNumber: number;
    pageSize: number;
    pageTotal: number;
  };
  data: PokemonBasic[];
};
