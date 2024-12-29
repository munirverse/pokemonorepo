'use client';

import qs from 'querystring';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import {
  useGetPokemonQuery,
  useGetPokemonShapesListQuery,
  useGetPokemonTypesListQuery,
} from '../lib/features/search/searchHook';
import { ContentContainer } from '../components/ContentContainer';
import { Hero } from './Hero';
import { PokemonCardWrapper } from '../components/PokemonCardWrapper';
import './page.scss';

export default function Index() {
  // selector
  const [pageSize, setPageSize] = useState<number>(8);

  const [activePage, setActivePage] = useState<number>(1);

  const [type, setType] = useState<string>('');

  const [shape, setShape] = useState<string>('');

  // query api
  const {
    data: pokemons,
    error: isGetPokemonError,
    isLoading: isGetPokemonLoading,
    isSuccess: isGetPokemonSuccess,
  } = useGetPokemonQuery(
    qs.stringify({
      page: activePage,
      limit: pageSize,
      ...(type ? { types: type } : {}),
      ...(shape ? { shape: shape } : {}),
    })
  );

  const { data: pokemonTypes } = useGetPokemonTypesListQuery('');

  const { data: pokemonShapes } = useGetPokemonShapesListQuery('');

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
            listTypes={pokemonTypes}
            listShapes={pokemonShapes}
            activeType={type}
            activeShape={shape}
            pageTotal={pokemons.pagination.pageTotal}
            pageSize={pageSize}
            activePage={activePage}
            onChangePageSize={setPageSize}
            onChangeActivePage={setActivePage}
            onChangeType={setType}
            onChangeShape={setShape}
          />
        )}
      </ContentContainer>
    </main>
  );
}
