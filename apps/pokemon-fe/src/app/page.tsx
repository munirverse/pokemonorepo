'use client';

import qs from 'querystring';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useGetPokemonQuery } from '../lib/features/search/searchHook';
import { ContentContainer } from '../components/ContentContainer';
import { Hero } from './Hero';
import { PokemonCardWrapper } from '../components/PokemonCardWrapper';
import './page.scss';

export default function Index() {
  // selector
  const [pageSize, setPageSize] = useState<number>(8);

  const [activePage, setActivePage] = useState<number>(1);

  // query api
  const {
    data: pokemons,
    error: isGetPokemonError,
    isLoading: isGetPokemonLoading,
    isSuccess: isGetPokemonSuccess,
  } = useGetPokemonQuery(qs.stringify({ page: activePage, limit: pageSize }));

  return (
    <main>
      <Navbar />
      <ContentContainer>
        <Hero />
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonError && <pre>error</pre>}
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
