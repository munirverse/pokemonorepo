import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import { PokemonCard } from './PokemonCard';
import '@mantine/core/styles.css';

const pokemons = [
  {
    title: 'Pikachu',
    color: 'yellow',
    urlImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
    type: 'electric',
    shape: 'quadruped',
  },
];

const meta = {
  title: 'Pokemon Card',
  component: PokemonCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      table: {
        readonly: true,
      },
    },
    urlImage: {
      table: {
        readonly: true,
      },
    },
    color: {
      table: {
        readonly: true,
      },
    },
    type: {
      table: {
        readonly: true,
      },
    },
    shape: {
      table: {
        readonly: true,
      },
    },
    loading: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: pokemons[0].title,
    color: pokemons[0].color,
    urlImage: pokemons[0].urlImage,
    type: pokemons[0].type,
    shape: pokemons[0].shape,
  },
  render: (props) => {
    return <PokemonCard {...props} />;
  },
};
