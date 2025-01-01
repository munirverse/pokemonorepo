import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import { MessageCard } from './MessageCard';
import '@mantine/core/styles.css';

const meta = {
  title: 'Wrapper Components/Message Card',
  tags: ['autodocs', 'wrapper components'],
  component: MessageCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
  argTypes: {
    type: {
      options: ['error', 'notfound', 'loader'],
      control: 'select',
    },
  },
} satisfies Meta<typeof MessageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: 'error' },
  render: (props) => <MessageCard {...props} />,
};
