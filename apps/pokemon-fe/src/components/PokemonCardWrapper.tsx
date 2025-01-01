import { Grid, Group, Pagination, List, Select } from '@mantine/core';
import { PokemonBasic, SelectList } from '../lib/features/search/searchType';
import { PokemonCard } from './PokemonCard';
import { useMediaQuery } from '@mantine/hooks';

const NavigationPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  BOTH: 'both',
} as const;

export type PokemonCardWrapperProps = {
  list: PokemonBasic[];
  listTypes?: SelectList[];
  listShapes?: SelectList[];
  enableFilter?: boolean;
  enablePagination?: boolean;
  navigationPosition?: (typeof NavigationPosition)[keyof typeof NavigationPosition];
  pageTotal?: number;
  initialPageSize?: number;
  pageSize?: number;
  activePage?: number;
  activeType?: string;
  activeShape?: string;
  onChangePageSize?: (pageSize: number) => void;
  onChangeActivePage?: (activePage: number) => void;
  onChangeType?: (type: string) => void;
  onChangeShape?: (shape: string) => void;
};

export function PokemonCardWrapper({
  list,
  listTypes = [],
  listShapes = [],
  onChangePageSize,
  onChangeActivePage,
  onChangeType,
  onChangeShape,
  pageTotal,
  initialPageSize = 8,
  pageSize,
  activeType = '',
  activeShape = '',
  activePage = 1,
  enableFilter = true,
  enablePagination = true,
  navigationPosition = 'both',
}: PokemonCardWrapperProps) {
  // constant
  const pageSizeList: string[] =
    pageSize === initialPageSize
      ? Array.from({ length: 3 }, (_, index) =>
          ((index + 1) * pageSize).toString()
        )
      : Array.from({ length: 3 }, (_, index) =>
          ((index + 1) * initialPageSize).toString()
        );

  // selector
  const isMobile = useMediaQuery('(max-width: 890px)');

  // handler
  const onChangePageSizeWrapper = (pageSize: string | null) => {
    if (onChangePageSize) onChangePageSize(pageSize ? +pageSize : 8);
  };

  const onChangeActivePageWrapper = (activePage: number) => {
    if (onChangeActivePage) onChangeActivePage(activePage ? activePage : 1);
  };

  const onChangeTypeWrapper = (type: string | null) => {
    if (onChangeType) onChangeType(type || '');
    // also reset active page to 1
    if (onChangeActivePage) onChangeActivePage(1);
  };

  const onChangeShapeWrapper = (shape: string | null) => {
    if (onChangeShape) onChangeShape(shape || '');
    // also reset active page to 1
    if (onChangeActivePage) onChangeActivePage(1);
  };

  const isNavigationTopEnabled = () =>
    navigationPosition === NavigationPosition.BOTH ||
    navigationPosition === NavigationPosition.TOP;

  const isNavigationBottomEnabled = () =>
    navigationPosition === NavigationPosition.BOTH ||
    navigationPosition === NavigationPosition.BOTTOM;

  const isHidden = (condition: boolean) => ({
    display: condition ? 'none' : undefined,
  });

  const PokemonFilterAndPaginationWrapper = () => (
    <Group justify={isMobile ? 'center' : 'space-between'}>
      <Group
        style={{ display: enableFilter ? undefined : 'none' }}
        wrap={'nowrap'}
      >
        <Select
          data={listTypes}
          value={activeType}
          maw={isMobile ? undefined : 120}
          style={isHidden(!listTypes.length)}
          onChange={onChangeTypeWrapper}
          placeholder="Types"
          searchable
          clearable
          size={isMobile ? 'xs' : 'md'}
        />
        <Select
          data={listShapes}
          value={activeShape}
          maw={isMobile ? undefined : 120}
          style={isHidden(!listShapes.length)}
          onChange={onChangeShapeWrapper}
          placeholder="Shapes"
          searchable
          clearable
          size={isMobile ? 'xs' : 'md'}
        />
        <Select
          data={pageSizeList}
          value={pageSize?.toString() || ''}
          onChange={onChangePageSizeWrapper}
          style={isHidden(isMobile !== true || !enablePagination)}
          size={'xs'}
        />
      </Group>
      <Group style={{ display: enablePagination ? undefined : 'none' }}>
        <Select
          data={pageSizeList}
          value={pageSize?.toString() || ''}
          onChange={onChangePageSizeWrapper}
          maw={70}
          style={isHidden(!pageSizeList.length || isMobile === true)}
        />
        <Pagination
          value={activePage}
          total={pageTotal || 0}
          onChange={onChangeActivePageWrapper}
          size={isMobile ? 'xs' : 'md'}
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
              mobileView={isMobile}
            />
          </Grid.Col>
        ))}
      </Grid>
      {isNavigationBottomEnabled() && <PokemonFilterAndPaginationWrapper />}
    </List>
  );
}
