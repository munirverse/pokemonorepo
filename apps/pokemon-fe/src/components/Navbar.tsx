'use client';

import { useMediaQuery } from '@mantine/hooks';

import { DekstopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

export const Navbar = () => {
  // selector
  const isMobile = useMediaQuery('(max-width: 890px)');

  return isMobile ? <MobileNavbar /> : <DekstopNavbar />;
};
