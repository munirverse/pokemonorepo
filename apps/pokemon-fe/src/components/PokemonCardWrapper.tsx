import { Grid, Group, Pagination, List, Select, keys } from '@mantine/core';
import { GetPokemonRes, PokemonBasic } from '../lib/features/search/searchType';
import { PokemonCard } from './PokemonCard';
import {
  usePaginationDispatch,
  usePaginationSelector,
} from '../lib/features/pagination/paginationHook';

type PokemonCardWrapperProps = {
  list: PokemonBasic[];
  pageData?: GetPokemonRes['pagination'];
  filter?: boolean;
  pagination?: boolean;
  filterAndPaginationPosition?: 'top' | 'bottom' | 'both';
  onChangePageSize?: (x: number) => void;
};

export function PokemonCardWrapper({
  list,
  pageData = undefined,
  filter = true,
  pagination: paginationFlag = true,
  filterAndPaginationPosition = 'both',
}: PokemonCardWrapperProps) {
  // constant
  const pageSizeList: string[] = pageData?.pageSize
    ? Array.from({ length: 3 }, (_, index) => ((index + 1) * 8).toString())
    : [];

  // selector
  const pagination = usePaginationSelector();

  // dispatch
  const paginationDispatch = usePaginationDispatch();

  // handler
  const handlePagesize = (sizeNumber: string | null) => {
    paginationDispatch.setPageNumber(sizeNumber ? +sizeNumber : 8);
  };

  const handleSetPage = (activeNumber: number) => {
    paginationDispatch.setActivePage(activeNumber ? activeNumber : 1);
  };

  const PokemonFilterAndPaginationWrapper = () => (
    <Group justify={'space-between'}>
      <Group style={{ display: filter ? undefined : 'none' }}>
        <Select data={['Grass']} value={'Grass'} maw={120} />
        <Select data={['Quadrupped']} value={'Quadrupped'} maw={150} />
        <Select data={['Yellow']} value={'Yellow'} maw={120} />
      </Group>
      <Group style={{ display: paginationFlag ? undefined : 'none' }}>
        <Select
          data={pageSizeList}
          value={pagination.pageNumber.toString()}
          onChange={handlePagesize}
          maw={70}
          style={{ display: pageData ? undefined : 'none' }}
        />
        <Pagination
          value={pagination.activePage}
          total={pageData?.pageTotal || 0}
          onChange={handleSetPage}
        />
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
