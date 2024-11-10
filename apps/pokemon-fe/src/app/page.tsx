'use client';

import qs from 'querystring';
import { Navbar } from '../components/Navbar';
import './page.scss';
import {
  useGetPokemonQuery,
  useSearchSelector,
} from '../lib/features/search/searchHook';
import { GetPokemonPayload } from '../lib/features/search/searchType';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Index() {
  // selector
  const search = useSearchSelector();

  const router = useRouter();

  // query api
  const baseGetPokemonqQuery: GetPokemonPayload = {
    page: 1,
    limit: 10,
  };

  const {
    data: pokemons,
    error: getPokemonError,
    isLoading: isGetPokemonLoading,
    isSuccess: isGetPokemonSuccess,
  } = useGetPokemonQuery(qs.stringify(baseGetPokemonqQuery));

  // use effect
  useEffect(() => {
    if (search.queryParams) {
      router.push(`/search?q=${search.queryParams}`);
    }
  }, [search]);

  return (
    <main>
      <Navbar />
      {isGetPokemonLoading && <pre>Loading...</pre>}
      {isGetPokemonSuccess && <pre>{JSON.stringify(pokemons)}</pre>}
    </main>
  );
}
