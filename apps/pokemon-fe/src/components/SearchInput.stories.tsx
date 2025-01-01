import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MantineProvider } from '@mantine/core';
import {
  SearchInput as OriginalSearchInput,
  SearchInputProps,
} from './SearchInput';
import '@mantine/core/styles.css';

const meta = {
  title: 'Components/Search Input',
  tags: ['autodocs', 'wrapper components'],
  component: OriginalSearchInput,
  argTypes: { size: { options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
  parameters: {
    layout: 'centered',
    argTypesRegex: '^on.*',
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
} satisfies Meta<typeof OriginalSearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchInput = (props: SearchInputProps) => {
  const [queryText, setQueryText] = useState<string>(props.value);

  const onChange = (value: string) => {
    action('onChange')(value);
    setQueryText(value);
  };

  const onKeydown = (value: string) => {
    action('onKeydown')(value);
  };

  return (
    <OriginalSearchInput
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
    size: 'xl',
    value: 'Pikachu',
  },
  render: (props) => <SearchInput {...props} />,
};
