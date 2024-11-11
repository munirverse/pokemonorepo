'use client';

import qs from 'querystring';
import { Navbar } from '../components/Navbar';
import './page.scss';
import {
  useGetPokemonQuery,
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';
import { GetPokemonPayload } from '../lib/features/search/searchType';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentContainer } from '../components/ContentContainer';
import { Hero } from './Hero';

export default function Index() {
  // selector
  const search = useSearchSelector();

  const router = useRouter();

  // dispatch
  const searchDispatch = useSearchDispatch();

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
    if (search.active) {
      searchDispatch.deactiveSearchMode();
    }

    if (search.queryParams) {
      router.push(`/search?q=${search.queryParams}`);
    }
  }, [search]);

  return (
    <main>
      <Navbar />
      <ContentContainer>
        <Hero />
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonSuccess && <pre>{JSON.stringify(pokemons)}</pre>}
      </ContentContainer>
    </main>
  );
}
