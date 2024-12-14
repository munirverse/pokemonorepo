'use client';

import qs from 'querystring';
import { Navbar } from '../components/Navbar';
import './page.scss';
import {
  useGetPokemonQuery,
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentContainer } from '../components/ContentContainer';
import { Hero } from './Hero';
import { PokemonCardWrapper } from '../components/PokemonCardWrapper';
import { usePaginationSelector } from '../lib/features/pagination/paginationHook';

export default function Index() {
  // selector
  const search = useSearchSelector();

  const pagination = usePaginationSelector();

  const router = useRouter();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // query api
  const {
    data: pokemons,
    error: getPokemonError,
    isLoading: isGetPokemonLoading,
    isSuccess: isGetPokemonSuccess,
  } = useGetPokemonQuery(
    qs.stringify({ page: pagination.activePage, limit: pagination.pageNumber })
  );

  // use effect
  useEffect(() => {
    if (search.active) {
      searchDispatch.deactiveSearchMode();
    }

    if (search.queryParams) {
      router.push(`/search?q=${search.queryParams}`);
    }
  }, [search, router, searchDispatch]);

  return (
    <main>
      <Navbar />
      <ContentContainer>
        <Hero />
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonSuccess && (
          <PokemonCardWrapper
            list={pokemons.data}
            pageData={pokemons.pagination}
          />
        )}
      </ContentContainer>
    </main>
  );
}
