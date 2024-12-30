'use client';

import qs from 'querystring';
import { useEffect, Suspense, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { ContentContainer } from '../../components/ContentContainer';
import {
  useGetInfiniteScrollPokemonQuery,
  useSearchDispatch,
  useSearchSelector,
  useGetPokemonTypesListQuery,
  useGetPokemonShapesListQuery,
} from '../../lib/features/search/searchHook';
import { PokemonCardWrapper } from '../../components/PokemonCardWrapper';

function SearchIndex() {
  // selector
  const urlQuery = useSearchParams();

  const router = useRouter();

  const search = useSearchSelector();

  const refObserver = useRef(null);

  const [type, setType] = useState<string>('');

  const [shape, setShape] = useState<string>('');

  // dispatch
  const searchDispatch = useSearchDispatch();

  // handler
  const onResetActivePage = (page: number) => {
    searchDispatch.setInfinteBaseQuery({ page });
  };

  // query api
  const {
    data: pokemons,
    isLoading: isGetPokemonLoading,
    isSuccess: isGetPokemonSuccess,
  } = useGetInfiniteScrollPokemonQuery(
    qs.stringify({
      ...search.infiniteBaseQuery,
      ...(type ? { types: type } : {}),
      ...(shape ? { shape: shape } : {}),
    }),
    {
      skip: !search.infiniteBaseQuery.name,
    }
  );

  const { data: pokemonTypes } = useGetPokemonTypesListQuery('');

  const { data: pokemonShapes } = useGetPokemonShapesListQuery('');

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
    if (!search.infiniteBaseQuery.name) {
      searchDispatch.setQueryText(urlQuery.get('q') || '');
      searchDispatch.setInfinteBaseQuery({ name: urlQuery.get('q') || '' });
    }

    // Empty dependency array ensures this effect runs only once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entires) => {
      const isTriggernNextPage =
        entires[0].isIntersecting &&
        isGetPokemonSuccess &&
        pokemons.hasNextPage;

      if (isTriggernNextPage) {
        searchDispatch.setInfinteBaseQuery({
          page: pokemons.currentPage + 1,
        });
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    observer.observe(refObserver.current! as Element);

    return () => observer.disconnect();
  }, [isGetPokemonSuccess, pokemons, search, searchDispatch]);

  return (
    <main>
      <Navbar />
      <ContentContainer>
        {isGetPokemonLoading && <pre>Loading...</pre>}
        {isGetPokemonSuccess && (
          <PokemonCardWrapper
            list={pokemons.data}
            listTypes={pokemonTypes}
            activeType={type}
            listShapes={pokemonShapes}
            activeShape={shape}
            enablePagination={false}
            navigationPosition={'top'}
            onChangeType={setType}
            onChangeShape={setShape}
            onChangeActivePage={onResetActivePage}
          />
        )}
        <div ref={refObserver} style={{ minHeight: 100 }}></div>
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
