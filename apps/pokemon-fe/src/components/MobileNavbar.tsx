import { Group } from '@mantine/core';

import './MobileNavbar.scss';
import { SearchInput } from './SearchInput';

export const MobileNavbar = () => {
  return (
    <nav className="navbar-mobile">
      <Group justify={'space-between'}>
        <section>
          <SearchInput placeholder="Search pokemon name" />
        </section>
      </Group>
    </nav>
  );
};
