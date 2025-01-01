'use client';

import qs from 'querystring';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import {
  useGetPokemonQuery,
  useGetPokemonShapesListQuery,
  useGetPokemonTypesListQuery,
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';
import { ContentContainer } from '../components/ContentContainer';
import { Hero } from './Hero';
import { PokemonCardWrapper } from '../components/PokemonCardWrapper';
import './page.scss';
import { MessageCard } from '../components/MessageCard';

export default function Index() {
  // selector
  const [pageSize, setPageSize] = useState<number>(8);

  const [activePage, setActivePage] = useState<number>(1);

  const [type, setType] = useState<string>('');

  const [shape, setShape] = useState<string>('');

  const search = useSearchSelector();

  // handler
  const searchDispatch = useSearchDispatch();

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

  // use effet
  useEffect(() => {
    // if search state active, disable all of it
    if (search.active || search.queryText || search.infiniteBaseQuery.name) {
      searchDispatch.setSearchActiveStatus(false);
      searchDispatch.setQueryText('');
      searchDispatch.setInfinteBaseQuery({ name: '', page: 1 });
    }
  }, []);

  return (
    <main>
      {!isGetPokemonLoading && <Navbar />}
      <ContentContainer>
        {!isGetPokemonLoading && <Hero />}
        {isGetPokemonLoading && <MessageCard type={'loader'} />}
        {isGetPokemonError && <MessageCard type={'error'} />}
        {isGetPokemonSuccess && pokemons?.data?.length > 0 && (
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
        {isGetPokemonSuccess && pokemons?.data?.length === 0 && (
          <MessageCard type={'notfound'} />
        )}
      </ContentContainer>
    </main>
  );
}
