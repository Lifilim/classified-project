import '../ui/global.css';
import { useAppSelector } from '../hooks/UserStoreHook';
import { selectUser } from '../stores/slices/UserSlice';
import { Text, Avatar, Card, Box, Flex, Loader } from '@mantine/core';

export const ProfilePage = () => {

    const user = useAppSelector(selectUser);
    // if (!user) throw Error("Login failed:");
     if (!user) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <h6>что-то не так...</h6> <br />
                <Loader /> {/* Или просто <div>Загрузка...</div> */}
            </Flex>
        );
    }

    return (
            <Box w="clamp(300px, 80vw, 600px)" mx="auto" pt="7vh">
                <Card withBorder p="lg md lg">
                    <Card.Section inheritPadding withBorder>
                        <Flex mb="xs" gap="md" align="center">
                            <Avatar src={user.avatar} color="--var(--secondary-color)"></Avatar>
                            <Text
                                fz="h1"
                                fw={900}
                                variant="gradient"
                                gradient={{ from: 'var(--secondary-color)', to: 'var(--accent-color)', deg: 90 }}
                            >
                                {user.name}
                            </Text>
                            <Flex direction="column" align="flex-start" justify="flex-start">
                                <Text fz="xs" c="--var(--text-color)">{user.createdAt}</Text>
                                <Text fz="xs" c="--var(--text-color)">{user.phone}</Text>
                            </Flex>
                        </Flex>
                    </Card.Section>

                    <Card.Section inheritPadding pb="xs" withBorder>
                        <Flex mt="sm" gap="md" align="center" justify="space-between">
                            <Text ta="left" fz="h3" c="--var(--text-color)">★ {user.rating}</Text>
                            <Text ta="right" fz="xs" c="--var(--text-color)">{user.city}</Text>
                        </Flex>
                    </Card.Section>
                </Card>
            </Box>
    );
};