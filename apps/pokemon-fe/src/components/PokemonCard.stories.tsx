import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import { PokemonCard } from './PokemonCard';
import '@mantine/core/styles.css';

const pokemons = {
  title: 'Pikachu',
  color: 'yellow',
  type: 'electric',
  shape: 'quadruped',
  urlImage:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
};

const meta = {
  title: 'Pokemon Card',
  tags: ['autodocs', 'components'],
  component: PokemonCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <div style={{ minWidth: 250 }}>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    urlImage: { table: { readonly: true } },
    loading: { table: { disable: true } },
  },
  args: { ...pokemons },
  render: (props) => <PokemonCard {...props} />,
};

export const Loading: Story = {
  name: 'On Loading',
  argTypes: {
    title: {
      table: { readonly: true },
    },
    color: {
      table: { readonly: true },
    },
    type: {
      table: { readonly: true },
    },
    shape: {
      table: { readonly: true },
    },
    urlImage: {
      table: { readonly: true },
    },
    loading: {
      table: { disable: true },
    },
  },
  args: {
    loading: true,
    ...pokemons,
  },
  render: (props) => <PokemonCard {...props} />,
};

export const Error: Story = {
  name: 'On Error',
  argTypes: {
    title: {
      table: { readonly: true },
    },
    color: {
      table: { readonly: true },
    },
    type: {
      table: { readonly: true },
    },
    shape: {
      table: { readonly: true },
    },
    urlImage: {
      table: { readonly: true },
    },
    loading: {
      table: { disable: true },
    },
  },

  args: {
    ...pokemons,
    urlImage: 'invalid_url',
  },

  render: (props) => <PokemonCard {...props} />,
};
