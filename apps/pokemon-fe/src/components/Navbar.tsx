'use client';

import { useDebouncedCallback, useMediaQuery } from '@mantine/hooks';

import { DekstopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';
import {
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';

export const Navbar = () => {
  // selector
  const isMobile = useMediaQuery('(max-width: 890px)');

  const search = useSearchSelector();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // handler
  const handleSearchBehaviour = useDebouncedCallback(
    async (queryText: string) => {
      searchDispatch.activateSearchMode();
    },
    700
  );

  const handleSetQueryText = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchDispatch.setQueryText(e.target.value);
    handleSearchBehaviour(e.target.value);
  };

  return isMobile ? (
    <MobileNavbar
      queryText={search.queryText}
      onSetQueryText={handleSetQueryText}
    />
  ) : (
    <DekstopNavbar
      queryText={search.queryText}
      onSetQueryText={handleSetQueryText}
    />
  );
};
