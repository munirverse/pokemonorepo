'use client';

import qs from 'querystring';
import { Navbar } from '../components/Navbar';
import './page.scss';
import { useGetPokemonQuery } from '../lib/features/search/searchHook';
import { useEffect, useState } from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Hero } from './Hero';
import { PokemonCardWrapper } from '../components/PokemonCardWrapper';

export default function Index() {
  // selector
  const [pageSize, setPageSize] = useState<number>(8);

  const [activePage, setActivePage] = useState<number>(1);

  // query api
  const {
    data: pokemons,
    error: getPokemonError,
    isLoading: isGetPokemonLoading,
    isSuccess: isGetPokemonSuccess,
  } = useGetPokemonQuery(qs.stringify({ page: activePage, limit: pageSize }));

  return (
    <main>
      <Navbar />
      <ContentContainer>
        <Hero />
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonSuccess && (
          <PokemonCardWrapper
            list={pokemons.data}
            paginationMeta={pokemons.pagination}
            pageSize={pageSize}
            activePage={activePage}
            onChangePageSize={setPageSize}
            onChangeActivePage={setActivePage}
          />
        )}
      </ContentContainer>
    </main>
  );
}
