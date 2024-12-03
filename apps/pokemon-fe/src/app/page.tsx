'use client';

import qs from 'querystring';
import { Grid } from '@mantine/core';
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
import { PokemonCard } from '../components/PokemonCard';

export default function Index() {
  // selector
  const search = useSearchSelector();

  const router = useRouter();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // query api
  const baseGetPokemonqQuery: GetPokemonPayload = {
    page: 1,
    limit: 12,
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
  }, [search, router, searchDispatch]);

  return (
    <main>
      <Navbar />
      <ContentContainer>
        <Hero />
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonSuccess && (
          <Grid mt={'lg'}>
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
