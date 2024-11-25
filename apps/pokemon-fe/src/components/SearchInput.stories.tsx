import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { StoreProvider } from '../app/StoreProvider';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Search Input',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search Pokemon',
  },
  render: (props) => (
    <MantineProvider>
      <StoreProvider>
        <SearchInput {...props} />
      </StoreProvider>
    </MantineProvider>
  ),
};
