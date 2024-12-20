import { useState } from 'react';
import Image from 'next/image';
import { Card, List, Text, Badge, Group } from '@mantine/core';
import './PokemonCard.scss';

type PokemonCardProps = {
  urlImage: string;
  title: string;
  color: string;
  type: string;
  shape: string;
};

export function PokemonCard({
  urlImage,
  title,
  color,
  type,
  shape,
}: PokemonCardProps) {
  const [isLoading, setLoading] = useState(true);
  const [imageSrc] = useState(urlImage);

  return (
    <Card shadow={'sm'} radius={'lg'}>
      <Card.Section>
        {isLoading && <div className="skeleton"></div>}
        <div className={'image-wrapper'}>
          <Image
            src={imageSrc}
            height={200}
            alt={title}
            width={200}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            style={{ visibility: isLoading ? 'hidden' : undefined }}
            loading={'lazy'}
          />
        </div>
      </Card.Section>
      <List mt={'xs'}>
        <Text size={'xs'} tt={'uppercase'} fw={700}>
          {isLoading ? 'Loading...' : title}
        </Text>
        {isLoading ? (
          <Badge mt={'xs'} color={'gray'} w={30} />
        ) : (
          <Group gap={'xs'} mt={'xs'}>
            <Badge color={color === 'white' ? 'gray' : color} size={'xs'}>
              {type}
            </Badge>
            <Badge color={'gray'} size={'xs'}>
              {shape || 'unknown'}
            </Badge>
          </Group>
        )}
      </List>
    </Card>
  );
}
