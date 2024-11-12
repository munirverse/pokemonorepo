'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Select, Button, Group, Text, Container } from '@mantine/core';
import {
  IconSearch,
  IconMessageQuestion,
  IconFile3d,
  IconAdjustmentsHorizontal,
} from '@tabler/icons-react';

import './DesktopNavbar.scss';
import { SearchInput } from './SearchInput';
import {
  useSearchDispatch,
  useSearchSelector,
} from '../lib/features/search/searchHook';

export const DekstopNavbar = () => {
  const links = [
    { link: '/', title: 'About', icon: <IconMessageQuestion size={16} /> },
    {
      link: '/',
      title: 'API Documentation',
      icon: <IconFile3d size={16} />,
    },
  ];

  // selector
  const search = useSearchSelector();

  // dispatch
  const searchDispatch = useSearchDispatch();

  // handler
  const handleDisplayNone = (condition: boolean) => ({
    display: !condition ? 'none' : undefined,
  });

  const handleHomeClick = () => {
    searchDispatch.setQueryText('');
    searchDispatch.setQueryParams('');
    searchDispatch.deactiveSearchMode();
  };

  return (
    <nav className="navbar-desktop">
      <Container size={'lg'}>
        <Group justify={'space-between'} className="navbar-wrapper">
          <section>
            <Link href={'/'} onClick={handleHomeClick}>
              <div className="image-wrapper">
                <Image
                  alt="logo"
                  src={'/logo.png'}
                  sizes="200px"
                  priority
                  fill
                  style={{ ...handleDisplayNone(search.active) }}
                />
              </div>
            </Link>
          </section>
          <section style={{ flex: 1 }}>
            <SearchInput
              placeholder="Search pokemon name"
              leftSection={<IconSearch size={16} />}
              style={{ ...handleDisplayNone(search.active) }}
            />
          </section>
          <section>
            <Group>
              {links.map(({ link, icon, title }) => (
                <Link href={link}>
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
                style={{ ...handleDisplayNone(false) }}
              >
                Settings
              </Button>
              <Select
                data={['🇬🇧 (EN)', '🇯🇵 (JP)']}
                value={'🇬🇧 (EN)'}
                checkIconPosition={'right'}
                className="lang-select"
                size="xs"
              ></Select>
            </Group>
          </section>
        </Group>
      </Container>
    </nav>
  );
};
