import { Flex, Text } from '@mantine/core';
import { IconMoodWrrrFilled, IconError404Off } from '@tabler/icons-react';

export type MessageCard = {
  type: 'error' | 'notfound';
  message?: string;
};

export function MessageCard({ type, message }: MessageCard) {
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
        {message || type === 'error'
          ? 'Something bad happened, please refresh the page'
          : 'Data is not found'}
      </Text>
    </Flex>
  );
}
