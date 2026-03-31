import { Card, Image, Text, Group, Button, Badge, Stack } from '@mantine/core';

import placeholderImg from '../assets/404.png';

interface ServiceCardProps {
    title: string;
    price: number | string;
    description: string;
    imageUrl?: string;
    category: string;
}

export const ServiceCard = ({
    title,
    price,
    description,
    imageUrl,
    category
}: ServiceCardProps) => {
    return (
        <Card
            shadow="sm"
            p="lg"
            radius={0}
            withBorder
            bg="var(--base-color)"
            style={{ borderColor: 'var(--neutral-color)' }}
        >
            <Card.Section>
                <Image
                    src={imageUrl || placeholderImg}
                    height={160}
                    alt={title}
                />
            </Card.Section>

            <Stack mt="md" gap="xs">
                <Group justify="space-between">
                    <Text fw={700} style={{ whiteSpace: 'pre-line' }} tt="uppercase" c="var(--secondary-color)">
                        {title}
                    </Text>
                    <Badge color="var(--surface-color)" radius={0} variant="filled">
                        {category}
                    </Badge>
                </Group>

                <Text size="sm" c="var(--neutral-color)" lineClamp={2}>
                    {description}
                </Text>

                <Text fw={900} size="xl" c="var(--accent-color)">
                    {price} ₽
                </Text>
            </Stack>

            <Button
                fullWidth
                mt="md"
                radius={0}
                bg="var(--secondary-color)"
                style={{ '--button-hover': 'var(--neutral-color)' } as any}
            >
                Подробнее
            </Button>
        </Card>
    );
};
