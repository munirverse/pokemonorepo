import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MantineProvider } from '@mantine/core';
import { SearchInput, SearchInputProps } from './SearchInput';
import '@mantine/core/styles.css';

const meta = {
  title: 'Search Input',
  component: SearchInput,
  argTypes: { size: { options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
  parameters: {
    layout: 'centered',
    argTypesRegex: '^on.*',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchInputWrapper = (props: SearchInputProps) => {
  const [queryText, setQueryText] = useState<string>(props.value);

  const onChange = (value: string) => {
    action('onChange')(value);
    setQueryText(value);
  };

  const onKeydown = (value: string) => {
    action('onKeydown')(value);
  };

  return (
    <SearchInput
      {...props}
      value={queryText}
      onChange={onChange}
      onKeydown={onKeydown}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: "Search Pokemon's name",
    size: "xl",
    value: 'Pikachu',
  },
  render: (props) => (
    <MantineProvider>
      <SearchInputWrapper {...props} />
    </MantineProvider>
  ),
};
