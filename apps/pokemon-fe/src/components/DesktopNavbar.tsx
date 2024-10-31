import Image from 'next/image';
import { Input, Select, Button, Group, Text } from '@mantine/core';
import {
  IconSearch,
  IconMessageQuestion,
  IconFile3d,
  IconAdjustmentsHorizontal,
} from '@tabler/icons-react';

import './DesktopNavbar.scss';

export const DekstopNavbar = () => {
  return (
    <nav className="navbar-desktop">
      <Group justify={'space-between'} className="navbar-wrapper">
        <section>
          <div className="image-wrapper">
            <Image alt="logo" src={'/logo.png'} fill />
          </div>
        </section>
        <section style={{ flex: 1 }}>
          <Input
            placeholder="Search pokemon name"
            leftSection={<IconSearch size={16} />}
          />
        </section>
        <section>
          <Group>
            <a href="/">
              <Group gap={'xs'}>
                <IconMessageQuestion size={16} />
                <Text>About</Text>
              </Group>
            </a>
            <a href="/">
              <Group gap={'xs'}>
                <IconFile3d size={16} />
                <Text>API Documentation</Text>
              </Group>
            </a>
            <Button
              leftSection={<IconAdjustmentsHorizontal size={16} />}
              disabled
            >
              Settings
            </Button>
            <Select
              data={['🇬🇧 (EN)', '🇯🇵 (JP)']}
              value={'🇬🇧 (EN)'}
              checkIconPosition={'right'}
              className="lang-select"
            ></Select>
          </Group>
        </section>
      </Group>
    </nav>
  );
};
