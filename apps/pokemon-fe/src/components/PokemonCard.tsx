import { useState } from 'react';
import Image from 'next/image';
import { Card, List, Text, Badge, Group, Flex } from '@mantine/core';
// @ts-ignore
import BrokenImage from '../../public/broken.png';
import './PokemonCard.scss';

export type PokemonCardProps = {
  urlImage: string;
  title: string;
  color: string;
  type: string;
  shape: string;
  loading?: boolean;
  mobileView?: boolean;
};

export function PokemonCard({
  urlImage,
  title,
  color,
  type,
  shape,
  loading = false,
  mobileView = false,
}: PokemonCardProps) {
  // selector
  const [isLoading, setLoading] = useState(true);

  const [imageSrc, setImageSrc] = useState(urlImage);

  const [isImageError, setImageError] = useState(false);

  // handler
  const onImageError = () => {
    setImageSrc(BrokenImage);
    setImageError(true);
  };

  const isHidden = (condtion: boolean) => {
    return { display: condtion ? 'none' : undefined };
  };

  const handleImageSize = () => {
    if (isImageError && !mobileView) return 151;
    if (isImageError && mobileView) return 101;
    if (mobileView) return 151;
    return 200;
  };

  return (
    <Card shadow={'sm'} radius={'lg'}>
      <Card.Section>
        {isLoading && <div className="skeleton"></div>}
        <div className={'image-wrapper'}>
          <Text mt={'lg'} size={'lg'} style={isHidden(!isImageError)}>
            Image is not available
          </Text>
          <Image
            src={imageSrc || '/'}
            height={handleImageSize()}
            alt={title}
            width={handleImageSize()}
            onLoad={() => loading || setLoading(false)}
            onError={onImageError}
            style={{ visibility: isLoading ? 'hidden' : undefined }}
            loading={'lazy'}
          />
        </div>
      </Card.Section>
      <Flex
        mt={'xs'}
        direction={'column'}
        align={mobileView ? 'center' : 'start'}
      >
        <Text size={'xs'} tt={'uppercase'} fw={700}>
          {isLoading ? 'Loading...' : title}
        </Text>
        {isLoading ? (
          <Badge mt={'xs'} color={'gray'} w={30} />
        ) : (
          <Group gap={'xs'} mt={'xs'} justify={mobileView ? 'center' : 'start'}>
            <Badge
              color={color === 'white' ? 'gray' : color}
              size={mobileView ? 'md' : 'xs'}
              miw={mobileView ? 100 : undefined}
            >
              {type}
            </Badge>
            <Badge
              color={'gray'}
              size={mobileView ? 'md' : 'xs'}
              miw={mobileView ? 100 : undefined}
            >
              {shape || 'unknown'}
            </Badge>
          </Group>
        )}
      </Flex>
    </Card>
  );
}
