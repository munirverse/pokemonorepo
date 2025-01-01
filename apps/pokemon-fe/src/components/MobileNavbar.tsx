import { Button, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import './MobileNavbar.scss';
import { SearchInput } from './SearchInput';
import {
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';
import {
  IconArrowBack,
  IconArrowLeft,
  IconArrowNarrowLeft,
} from '@tabler/icons-react';

export const MobileNavbar = () => {
  // selector
  const search = useSearchSelector();

  const router = useRouter();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // handler
  const onSearchInputKeydown = async (value: string) => {
    searchDispatch.setInfinteBaseQuery({ name: value, page: 1 });
    router.push(`/search?q=${value}`);
  };

  const isHidden = (condition: boolean) => ({
    display: condition ? 'none' : undefined,
  });

  const onBackToHomeClick = () => {
    router.push('/');
  };

  return (
    <nav
      className="navbar-mobile"
      style={{ ...isHidden(!search.active), paddingTop: '1rem' }}
    >
      <Button
        leftSection={<IconArrowNarrowLeft />}
        variant={'transparent'}
        color={'white'}
        onClick={onBackToHomeClick}
      >
        Back to home
      </Button>
      <Group justify={'center'} pt={'lg'}>
        <section>
          <SearchInput
            miw={300}
            value={search.queryText}
            onChange={searchDispatch.setQueryText}
            onKeydown={onSearchInputKeydown}
          />
        </section>
      </Group>
    </nav>
  );
};
