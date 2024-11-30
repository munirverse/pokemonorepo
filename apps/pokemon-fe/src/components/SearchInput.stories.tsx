import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, List, Text } from '@mantine/core';
import '@mantine/core/styles.css';

import { StoreProvider } from '../app/StoreProvider';
import { SearchInput, SearchInputProps } from './SearchInput';
import { useSearchSelector } from '../lib/features/search/searchHook';

const meta = {
  title: 'Search Input',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchInputGroups = (props: SearchInputProps) => {
  // selector
  const search = useSearchSelector();

  return (
    <List spacing={'md'} listStyleType={'none'}>
      <List.Item>
        {' '}
        <SearchInput {...props} />
      </List.Item>
      <List.Item>
        {' '}
        <Text size="xs">Search Query Text: {search.queryText}</Text>
      </List.Item>
      <List.Item>
        {' '}
        <Text size="xs">Search Query Params: {search.queryParams}</Text>
      </List.Item>
      <List.Item>
        {' '}
        <Text size="xs">
          Search Active Status: {search.active ? 'true' : 'false'}
        </Text>
      </List.Item>
    </List>
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Search Pokemon',
  },
  render: (props) => (
    <MantineProvider>
      <StoreProvider>
        <SearchInputGroups {...props} />
      </StoreProvider>
    </MantineProvider>
  ),
};
