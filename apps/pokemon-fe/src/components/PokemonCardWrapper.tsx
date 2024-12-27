import { Grid, Group, Pagination, List, Select } from '@mantine/core';
import { PokemonBasic } from '../lib/features/search/searchType';
import { PokemonCard } from './PokemonCard';

const NavigationPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  BOTH: 'both',
} as const;

export type PokemonCardWrapperProps = {
  list: PokemonBasic[];
  enableFilter?: boolean;
  enablePagination?: boolean;
  navigationPosition?: (typeof NavigationPosition)[keyof typeof NavigationPosition];
  pageTotal?: number;
  pageSize?: number;
  activePage?: number;
  onChangePageSize?: (pageSize: number) => void;
  onChangeActivePage?: (activePage: number) => void;
};

export function PokemonCardWrapper({
  list,
  onChangePageSize,
  onChangeActivePage,
  pageTotal,
  pageSize,
  activePage = 1,
  enableFilter = true,
  enablePagination = true,
  navigationPosition = 'both',
}: PokemonCardWrapperProps) {
  // constant
  const pageSizeList: string[] = pageSize
    ? Array.from({ length: 3 }, (_, index) =>
        ((index + 1) * pageSize).toString()
      )
    : [];

  // handler
  const onChangePageSizeWrapper = (pageSize: string | null) => {
    if (onChangePageSize) onChangePageSize(pageSize ? +pageSize : 8);
  };

  const onChangeActivePageWrapper = (activePage: number) => {
    if (onChangeActivePage) onChangeActivePage(activePage ? activePage : 1);
  };

  const isNavigationTopEnabled = () =>
    navigationPosition === NavigationPosition.BOTH ||
    navigationPosition === NavigationPosition.TOP;

  const isNavigationBottomEnabled = () =>
    navigationPosition === NavigationPosition.BOTH ||
    navigationPosition === NavigationPosition.BOTTOM;

  const isHidden = (condtion: boolean) => ({
    display: condtion ? 'none' : undefined,
  });

  const PokemonFilterAndPaginationWrapper = () => (
    <Group justify={'space-between'}>
      <Group style={{ display: enableFilter ? undefined : 'none' }}>
        <Select data={['Grass']} value={'Grass'} maw={120} />
        <Select data={['Quadrupped']} value={'Quadrupped'} maw={150} />
        <Select data={['Yellow']} value={'Yellow'} maw={120} />
      </Group>
      <Group style={{ display: enablePagination ? undefined : 'none' }}>
        <Select
          data={pageSizeList}
          value={pageSize?.toString() || ''}
          onChange={onChangePageSizeWrapper}
          maw={70}
          style={isHidden(!pageSizeList.length)}
        />
        <Pagination
          value={activePage}
          total={pageTotal || 0}
          onChange={onChangeActivePageWrapper}
        />
      </Group>
    </Group>
  );

  return (
    <List my={'lg'}>
      {isNavigationTopEnabled() && <PokemonFilterAndPaginationWrapper />}
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
      {isNavigationBottomEnabled() && <PokemonFilterAndPaginationWrapper />}
    </List>
  );
}
