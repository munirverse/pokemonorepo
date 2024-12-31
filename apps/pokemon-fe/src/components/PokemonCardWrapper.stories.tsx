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
      shape: 'upright',
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

const types = [
  {
    value: 'grass',
    label: 'Grass',
  },
  {
    value: 'fire',
    label: 'Fire',
  },
  {
    value: 'poison',
    label: 'Poison',
  },
];

const shapes = [
  {
    value: 'upright',
    label: 'Upright',
  },
  {
    value: 'quadruped',
    label: 'Quadruped',
  },
  {
    value: 'blob',
    label: 'Blob',
  },
];

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

  const [type, setType] = useState<string>(props.activeType!);

  const [shape, setShape] = useState<string>(props.activeShape!);

  const onChangeActivePage = (value: number) => {
    action('onChangeActivePage')(value);
    setActivePage(value);
  };

  const onChangePageSize = (value: number) => {
    action('onChangePageSize')(value);
    setPageSize(value);
  };

  const oncChangeType = (value: string) => {
    action('onChangeType')(value);
    setType(value);
  };

  const oncChangeShape = (value: string) => {
    action('onChangeShape')(value);
    setShape(value);
  };

  return (
    <OriginalPokemonCardWrapper
      list={props.list}
      listTypes={props.listTypes}
      activeType={type}
      listShapes={props.listShapes}
      activeShape={shape}
      pageTotal={props.pageTotal}
      pageSize={pageSize}
      activePage={activePage}
      onChangeActivePage={onChangeActivePage}
      onChangePageSize={onChangePageSize}
      onChangeType={oncChangeType}
      onChangeShape={oncChangeShape}
      initialPageSize={props.initialPageSize}
    />
  );
};

export const Default: Story = {
  args: {
    list: pokemons.data,
    listTypes: types,
    activeType: types[0].value,
    listShapes: shapes,
    activeShape: shapes[0].value,
    pageTotal: pokemons.paginationMeta.pageTotal,
    pageSize: pokemons.paginationMeta.pageSize,
    activePage: pokemons.paginationMeta.pageNumber,
    initialPageSize: pokemons.paginationMeta.pageSize,
  },
  render: (props) => <PokemonCardWrapper {...props} />,
};
