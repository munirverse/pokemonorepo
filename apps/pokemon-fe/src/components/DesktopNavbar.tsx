'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Group, Text, Container, Select } from '@mantine/core';
import {
  IconSearch,
  IconMessageQuestion,
  IconFile3d,
  IconAdjustmentsHorizontal,
  IconBrandGithub,
} from '@tabler/icons-react';

import './DesktopNavbar.scss';
import { SearchInput } from './SearchInput';
import {
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';

export const DekstopNavbar = () => {
  // constant
  const links = [
    {
      link: 'https://pokemonorepo.munirverse.com/docs/storybook',
      title: 'About',
      icon: <IconMessageQuestion size={16} />,
    },
    {
      link: 'https://pokemonorepo.munirverse.com/docs/api-specs',
      title: 'API Documentation',
      icon: <IconFile3d size={16} />,
    },
    {
      link: 'https://github.com/munirverse/pokemonorepo',
      title: 'Github',
      icon: <IconBrandGithub size={16} />,
    },
  ];

  // selector
  const router = useRouter();

  const search = useSearchSelector();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // handler
  const isHidden = (condition: boolean) => ({
    display: condition ? 'none' : undefined,
  });

  const onLogoClick = () => {
    router.push('/');
  };

  const onSearchInputKeydown = async (value: string) => {
    searchDispatch.setInfinteBaseQuery({ name: value, page: 1 });
    router.push(`/search?q=${value}`);
  };

  return (
    <nav className="navbar-desktop">
      <Container size={'lg'}>
        <Group justify={'space-between'} className="navbar-wrapper">
          <section>
            <div className="image-wrapper" onClick={onLogoClick}>
              <Image
                alt="logo"
                src={'/logo.png'}
                sizes="200px"
                priority
                fill
                style={isHidden(!search.active)}
              />
            </div>
          </section>
          <section style={{ flex: 1 }}>
            <SearchInput
              value={search.queryText}
              leftSection={<IconSearch size={16} />}
              style={isHidden(!search.active)}
              onChange={searchDispatch.setQueryText}
              onKeydown={onSearchInputKeydown}
              placeholder="Search pokemon name"
            />
          </section>
          <section>
            <Group>
              {links.map(({ link, icon, title }) => (
                <Link key={title} href={link}>
                  <Group gap={'xs'}>
                    {icon}
                    <Text size="xs">{title}</Text>
                  </Group>
                </Link>
              ))}
              <Button
                size="xs"
                leftSection={<IconAdjustmentsHorizontal size={16} />}
                disabled
                style={isHidden(true)}
              >
                Settings
              </Button>
              <Select
                data={['🇬🇧 (EN)', '🇯🇵 (JP)']}
                value={'🇬🇧 (EN)'}
                checkIconPosition={'right'}
                className="lang-select"
                size="xs"
                style={isHidden(true)}
              ></Select>
            </Group>
          </section>
        </Group>
      </Container>
    </nav>
  );
};
