import { Grid, Group, Pagination, List, Select } from '@mantine/core';
import { PokemonBasic } from '../lib/features/search/searchType';
import { PokemonCard } from './PokemonCard';

type PokemonCardWrapperProps = {
  list: PokemonBasic[];
  filter?: boolean;
  pagination?: boolean;
  filterAndPaginationPosition?: 'top' | 'bottom' | 'both';
};

export function PokemonCardWrapper({
  list,
  filter = true,
  pagination = true,
  filterAndPaginationPosition = 'both',
}: PokemonCardWrapperProps) {
  const PokemonFilterAndPaginationWrapper = () => (
    <Group justify={'space-between'}>
      <Group style={{ display: filter ? undefined : 'none' }}>
        <Select data={['Grass']} value={'Grass'} maw={120} />
        <Select data={['Quadrupped']} value={'Quadrupped'} maw={150} />
        <Select data={['Yellow']} value={'Yellow'} maw={120} />
      </Group>
      <Group style={{ display: pagination ? undefined : 'none' }}>
        <Select data={['8', '16', '24']} value={'8'} maw={60} />
        <Pagination total={list.length} />
      </Group>
    </Group>
  );

  return (
    <List my={'lg'}>
      {(filterAndPaginationPosition === 'both' ||
        filterAndPaginationPosition === 'top') && (
        <PokemonFilterAndPaginationWrapper />
      )}
      <Grid my={'lg'}>
        {list.map((item) => (
          <Grid.Col key={item.id} span={{ base: 6, md: 3, lg: 3 }}>
            <PokemonCard
              urlImage={item.icon[0]}
              title={item.name}
              color={item.color}
              type={item.types[0]}
              shape={item.shape}
            />
          </Grid.Col>
        ))}
      </Grid>
      {(filterAndPaginationPosition === 'both' ||
        filterAndPaginationPosition === 'bottom') && (
        <PokemonFilterAndPaginationWrapper />
      )}
    </List>
  );
}
