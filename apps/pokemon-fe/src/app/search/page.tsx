'use client';

import qs from 'querystring';
import { useEffect, Suspense } from 'react';
import { Button } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { ContentContainer } from '../../components/ContentContainer';
import {
  useGetPokemonQuery,
  useSearchDispatch,
  useSearchSelector,
} from '../../lib/features/search/searchHook';
import {
  GetPokemonPayload,
  PokemonBasic,
} from '../../lib/features/search/searchType';
import { PokemonCardWrapper } from '../../components/PokemonCardWrapper';
import {
  usePaginationDispatch,
  usePaginationSelector,
} from '../../lib/features/pagination/paginationHook';

function SearchIndex() {
  // selector
  const urlQuery = useSearchParams();

  const router = useRouter();

  const search = useSearchSelector();

  const pagination = usePaginationSelector();

  // dispatch
  const searchDispatch = useSearchDispatch();

  const paginationDispatch = usePaginationDispatch();

  // query api
  const basePokemonQuery: GetPokemonPayload = {
    name: urlQuery.get('q') || '',
    page: 1,
    limit: 12,
  };

  const {
    data: pokemons,
    isLoading: isGetPokemonLoading,
    isSuccess: isGetPokemonSuccess,
  } = useGetPokemonQuery(qs.stringify(basePokemonQuery), {
    skip: !urlQuery.get('q'),
  });

  // use effect
  useEffect(() => {
    // redirect to home if query search not found
    if (!urlQuery.get('q')) {
      searchDispatch.setSearchActiveStatus(false);
      router.push('/');
    }

    // Activate search status if it is not already active
    if (!search.active) {
      searchDispatch.setSearchActiveStatus(true);
    }

    // Set the initiate query text value if it is null
    if (!search.queryText) {
      searchDispatch.setQueryText(urlQuery.get('q')!);
    }

    // Empty dependency array ensures this effect runs only once on component mount
  }, []);

  return (
    <main>
      <Navbar />
      <ContentContainer>
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonSuccess && (
          <PokemonCardWrapper
            list={pokemons.data}
            enablePagination={false}
            navigationPosition={'top'}
            paginationMeta={pokemons?.pagination}
          />
        )}
      </ContentContainer>
    </main>
  );
}

export default function Search() {
  return (
    <Suspense>
      <SearchIndex />
    </Suspense>
  );
}
