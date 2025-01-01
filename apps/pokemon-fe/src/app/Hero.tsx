import Link from 'next/link';
import Image from 'next/image';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';
import { SearchInput } from '../components/SearchInput';
import {
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';
import './Hero.scss';

export const Hero = () => {
  // selector
  const router = useRouter();

  const search = useSearchSelector();

  const isMobile = useMediaQuery('(max-width: 890px)');

  // dispatch
  const searchDispatch = useSearchDispatch();

  // handler
  const onSearchInputKeydown = (value: string) => {
    searchDispatch.setSearchActiveStatus(true);
    searchDispatch.setQueryText(value);
    router.push(`/search?q=${value}`);
  };

  return (
    <div className="hero">
      <Flex align={'center'} justify={'center'} direction={'column'}>
        <a href="/">
          <Image
            alt="logo"
            src={'/logo.png'}
            sizes="200px"
            width={200}
            height={60}
            priority
          />
        </a>

        <SearchInput
          value={search.queryText}
          size={'sm'}
          placeholder="Search pokemon name"
          miw={isMobile ? 300 : 400}
          leftSection={<IconSearch size={16} />}
          onChange={searchDispatch.setQueryText}
          onKeydown={onSearchInputKeydown}
        />
      </Flex>
    </div>
  );
};
