'use client';

import qs from 'querystring';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Navbar } from '../../components/Navbar';
import { ContentContainer } from '../../components/ContentContainer';
import {
  useGetPokemonQuery,
  useSearchDispatch,
  useSearchSelector,
} from '../../lib/features/search/searchHook';
import { GetPokemonPayload } from '../../lib/features/search/searchType';

export default function SearchIndex() {
  // selector
  const urlQuery = useSearchParams();

  const router = useRouter();

  const search = useSearchSelector();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // query api
  const basePokemonQuery: GetPokemonPayload = {
    name: urlQuery.get('q') || '',
    page: 1,
    limit: 10,
  };

  const { data: pokemons } = useGetPokemonQuery(
    qs.stringify(basePokemonQuery),
    {
      skip: !urlQuery.get('q'),
    }
  );

  // use effect
  useEffect(() => {
    // redirect to home if query search not found
    if (!urlQuery.get('q')) {
      router.push('/');
    }

    // redirect to new query search if new search keywords changed
    if (urlQuery.get('q') !== search.queryParams) {
      router.push(`/search?q=${search.queryParams}`);
    }

    if (!search.active) {
      searchDispatch.activateSearchMode();
    }
  }, [urlQuery, search]);

  return (
    <main>
      <Navbar />
      <ContentContainer>
        {urlQuery.get('q')}
        {JSON.stringify(pokemons)}
      </ContentContainer>
    </main>
  );
}
