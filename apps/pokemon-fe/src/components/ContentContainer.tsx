import { Container } from '@mantine/core';
import './ContentContainer.scss';
import { ReactNode } from 'react';

export const ContentContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container className="content-container" size={'lg'}>
      {children}
    </Container>
  );
};
