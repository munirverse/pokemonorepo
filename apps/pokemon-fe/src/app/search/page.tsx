'use client';

import qs from 'querystring';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Grid } from '@mantine/core';

import { Navbar } from '../../components/Navbar';
import { ContentContainer } from '../../components/ContentContainer';
import {
  useGetPokemonQuery,
  useSearchDispatch,
  useSearchSelector,
} from '../../lib/features/search/searchHook';
import { GetPokemonPayload } from '../../lib/features/search/searchType';
import { PokemonCard } from '../../components/PokemonCard';

function SearchIndex() {
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
      router.push('/');
    }

    // redirect to new query search if new search keywords changed
    if (urlQuery.get('q') !== search.queryParams) {
      router.push(`/search?q=${search.queryParams}`);
    }

    if (!search.active) {
      searchDispatch.activateSearchMode();
    }
  }, [urlQuery, search, router, searchDispatch]);

  return (
    <main>
      <Navbar />
      <ContentContainer>
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonSuccess && (
          <Grid>
            {pokemons.map((pokemon) => (
              <Grid.Col key={pokemon.id} span={{ base: 6, md: 3, lg: 3 }}>
                <PokemonCard
                  urlImage={pokemon.icon[0]}
                  title={pokemon.name}
                  color={pokemon.color}
                  type={pokemon.types[0]}
                  shape={pokemon.shape}
                />
              </Grid.Col>
            ))}
          </Grid>
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
