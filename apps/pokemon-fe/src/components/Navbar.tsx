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
  const handleSetQueryParams = useDebouncedCallback((queryText: string) => {
    searchDispatch.setQueryParams(queryText);
  }, 700);

  const handleSetQueryText = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchDispatch.setQueryText(e.target.value);
    handleSetQueryParams(e.target.value);
  };

  const handleClearQueryText = () => {
    searchDispatch.setQueryText('');
    handleSetQueryParams('');
  };

  return isMobile ? (
    <MobileNavbar
      queryText={search.queryText}
      onSetQueryText={handleSetQueryText}
      onClearQueryText={handleClearQueryText}
    />
  ) : (
    <DekstopNavbar
      queryText={search.queryText}
      onSetQueryText={handleSetQueryText}
      onClearQueryText={handleClearQueryText}
    />
  );
};
