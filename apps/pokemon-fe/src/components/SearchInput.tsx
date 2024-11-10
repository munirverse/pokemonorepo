'use client';

import { CloseButton, Input, InputProps } from '@mantine/core';
import {
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';

type SearchInputProps = {
  placeholder: string;
} & InputProps;

export const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
  // selector
  const search = useSearchSelector();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // handler
  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchDispatch.setQueryText(e.target.value);
  };

  const handleClearInput = () => {
    searchDispatch.setQueryText('');
  };

  const handleSubmitInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchDispatch.setQueryParams(search.queryText);
    }
  };

  return (
    <Input
      placeholder={placeholder}
      value={search.queryText}
      onChange={handleSetInput}
      onKeyDown={handleSubmitInput}
      rightSectionPointerEvents="all"
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={handleClearInput}
          style={{ display: search.queryText ? undefined : 'none' }}
        />
      }
      {...props}
    ></Input>
  );
};
