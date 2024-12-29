export type SearchState = {
  active: boolean;
  queryText: string;
  queryParams: string;
  infiniteBaseQuery: {
    name: string;
    page: number;
    limit: number;
  };
};

export type UpdateInfiteBaseQuery = Partial<SearchState['infiniteBaseQuery']>;

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

export type PokemonInfiniteList = {
  data: PokemonBasic[];
  currentQuery: string;
  currentPage: number;
  hasNextPage: boolean;
};

export type SelectList = {
  label: string;
  value: string;
};
