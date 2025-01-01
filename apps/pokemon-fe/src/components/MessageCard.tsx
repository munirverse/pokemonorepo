import { Button, Flex, Grid, Loader, Text } from '@mantine/core';
import { IconMoodWrrrFilled, IconError404Off } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { PokemonCard } from './PokemonCard';

export type MessageCard = {
  type: 'error' | 'notfound' | 'loader';
  message?: string;
};

export function MessageCard({ type, message }: MessageCard) {
  // constant
  const messageMap = {
    error: 'Something bad happened, please refresh the page',
    notfound: 'Data is not found',
    loader: 'Wait for seconds...',
  };

  // selector
  const router = useRouter();

  // handler
  const onNotFoundButtonClik = () => {
    router.push('/');
  };

  return (
    <Flex
      justify={'center'}
      align={'center'}
      p={'lg'}
      direction={'column'}
      gap={'lg'}
      mih={350}
    >
      {type === 'error' && <IconMoodWrrrFilled size={48} color="white" />}
      {type === 'notfound' && <IconError404Off size={48} color="white" />}
      <Text size="md" c="white">
        {message || messageMap[type]}
      </Text>
      {type === 'notfound' && (
        <Button onClick={onNotFoundButtonClik}>Back to home</Button>
      )}
      {type === 'loader' && (
        <>
          <Loader color="white" />
          <Grid>
            {Array.from({ length: 4 }, (_, i) => i).map((item) => (
              <Grid.Col key={item} span={{ base: 6, md: 3, lg: 3 }}>
                <PokemonCard
                  title=""
                  urlImage=""
                  type=""
                  shape=""
                  color=""
                  loading
                />
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
    </Flex>
  );
}
