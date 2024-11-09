import { Group } from '@mantine/core';

import './MobileNavbar.scss';
import { SearchInput } from './SearchInput';

type MobileNavbarProps = {
  queryText: string;
  onSetQueryText: (x: any) => any;
  onClearQueryText: () => any;
};

export const MobileNavbar = ({
  queryText,
  onSetQueryText,
  onClearQueryText,
}: MobileNavbarProps) => {
  return (
    <nav className="navbar-mobile">
      <Group justify={'space-between'}>
        <section>
          <SearchInput
            placeholder="Search pokemon name"
            queryText={queryText}
            onClearQueryText={onClearQueryText}
            onSetQueryText={onSetQueryText}
          />
        </section>
        <section>{queryText}</section>
      </Group>
    </nav>
  );
};
