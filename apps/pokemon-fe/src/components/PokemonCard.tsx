import { Card, Image, List, Text, Badge, Group } from '@mantine/core';

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
  return (
    <Card shadow={'sm'} radius={'lg'}>
      <Card.Section>
        <Image src={urlImage} height={200} alt={title} />
      </Card.Section>
      <List mt={'xs'}>
        <Text size={'xs'} tt={'uppercase'} fw={700}>
          {title}
        </Text>
        <Group gap={'xs'} mt={'xs'}>
          <Badge color={color} size={'xs'}>
            {type}
          </Badge>
          <Badge color={'gray'} size={'xs'}>
            {shape}
          </Badge>
        </Group>
      </List>
    </Card>
  );
}
