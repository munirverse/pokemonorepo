import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MantineProvider } from '@mantine/core';
import {
  PokemonCardWrapper as OriginalPokemonCardWrapper,
  PokemonCardWrapperProps,
} from './PokemonCardWrapper';
import '@mantine/core/styles.css';

const pokemons = {
  paginationMeta: {
    pageNumber: 1,
    pageSize: 4,
    pageTotal: 10,
  },
  data: [
    {
      id: 1,
      name: 'bulbasaur',
      types: ['grass', 'poison'],
      color: 'green',
      shape: 'quadruped',
      icon: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
      ],
    },
    {
      id: 2,
      name: 'ivysaur',
      types: ['grass', 'poison'],
      color: 'green',
      shape: 'quadruped',
      icon: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png',
      ],
    },
    {
      id: 3,
      name: 'venusaur',
      types: ['grass', 'poison'],
      color: 'green',
      shape: 'quadruped',
      icon: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png',
      ],
    },
    {
      id: 4,
      name: 'charmander',
      types: ['fire'],
      color: 'red',
      shape: 'upright',
      icon: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png',
      ],
    },
  ],
};

const meta = {
  title: 'Pokemon Card Wrapper',
  tags: ['autodocs', 'wrapper components'],
  component: OriginalPokemonCardWrapper,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <MantineProvider>
          <div style={{ minWidth: 250 }}>
            <Story />
          </div>
        </MantineProvider>
      );
    },
  ],
} satisfies Meta<typeof OriginalPokemonCardWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const PokemonCardWrapper = (props: PokemonCardWrapperProps) => {
  const [pageSize, setPageSize] = useState<number>(props.pageSize!);

  const [activePage, setActivePage] = useState<number>(props.activePage!);

  const onChangeActivePage = (value: number) => {
    action('onChangeActivePage')(value);
    setActivePage(value);
  };

  const onChangePageSize = (value: number) => {
    action('onChangePageSize')(value);
    setPageSize(value);
  };

  return (
    <OriginalPokemonCardWrapper
      list={props.list}
      pageTotal={props.pageTotal}
      pageSize={pageSize}
      activePage={activePage}
      onChangeActivePage={onChangeActivePage}
      onChangePageSize={onChangePageSize}
    />
  );
};

export const Default: Story = {
  args: {
    list: pokemons.data,
    pageTotal: pokemons.paginationMeta.pageTotal,
    pageSize: pokemons.paginationMeta.pageSize,
    activePage: pokemons.paginationMeta.pageNumber,
  },
  render: (props) => <PokemonCardWrapper {...props} />,
};
