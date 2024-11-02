import { Group, Input } from '@mantine/core';

import './MobileNavbar.scss';

type MobileNavbarProps = {
  queryText: string;
  onSetQueryText: (x: any) => any;
};

export const MobileNavbar = ({
  queryText,
  onSetQueryText,
}: MobileNavbarProps) => {
  return (
    <nav className="navbar-mobile">
      <Group justify={'space-between'}>
        <section>
          <Input
            placeholder="Search pokemon name"
            value={queryText}
            onChange={onSetQueryText}
          />
        </section>
        <section>{queryText}</section>
      </Group>
    </nav>
  );
};
