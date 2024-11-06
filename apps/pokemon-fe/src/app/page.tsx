'use client';

import qs from 'querystring';
import { Navbar } from '../components/Navbar';
import './page.scss';
import {
  useSearchSelector,
  useGetPokemonQuery,
} from '../lib/features/search/searchHook';

export default function Index() {
  // selector
  const search = useSearchSelector();

  // query api
  const {
    data: pokemons,
    error: getPokemonError,
    isLoading: isGetPokemonLoading,
  } = useGetPokemonQuery(qs.stringify({ name: search.queryParams }), {
    skip: !search.queryParams,
  });

  return (
    <main>
      <Navbar />
    </main>
  );
}
