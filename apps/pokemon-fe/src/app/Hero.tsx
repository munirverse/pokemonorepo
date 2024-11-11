import Image from 'next/image';
import { Flex } from '@mantine/core';
import { SearchInput } from '../components/SearchInput';
import { IconSearch } from '@tabler/icons-react';

import './Hero.scss';

export const Hero = () => {
  return (
    <div className="hero">
      <Flex align={'center'} justify={'center'} direction={'column'}>
        <Image
          alt="logo"
          src={'/logo.png'}
          sizes="200px"
          width={200}
          height={60}
          priority
        />
        <SearchInput
          placeholder="Search pokemon name"
          miw={400}
          leftSection={<IconSearch size={16} />}
        />
      </Flex>
    </div>
  );
};
