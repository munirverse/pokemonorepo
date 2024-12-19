import { PokemonBasic } from '../search/searchType';

export type PaginationState = {
  pageNumber: number;
  activePage: number;
  infiniteList: PokemonBasic[];
};
