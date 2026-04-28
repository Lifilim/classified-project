import '../ui/global.css';
import { deleteUserThunk, selectUser, updateUserThunk } from '../stores/slices/UserSlice';
import { fetchMyServicesThunk, selectMyServices } from '../stores/slices/ServicesSlice';
import { ServiceCard } from '../components/ServiceCard';
import { Text, Avatar, Card, Box, Flex, Button, ActionIcon, TextInput, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';
import { IconCircleCheck, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

export const EditProfilePage = () => {

    const user = useAppSelector(selectUser);
    // const services = useAppSelector(selectMyServices);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        dispatch(fetchMyServicesThunk());
    }, [dispatch]);

    const [form, setForm] = useState({
        name: user?.name || '',
        // phone: user?.phone || '',
        // avatar: user?.avatar || '',
        // city: user?.city || '',
    });


    const handleDelete = async () => {
        await dispatch(deleteUserThunk());
        // navigate('/login');
    };

    if (!user) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <h6>что-то не так...</h6> <br />
                {/* <Loader />  <div>Загрузка...</div> */}
            </Flex>
        );
    }

    return (
        <Box w="clamp(300px, 80vw, 600px)" mx="auto" pt="7vh">
            <Card withBorder p="lg md lg">
                <Card.Section inheritPadding withBorder>
                    <Flex mb="xs" gap="md" align="center">
                        <Avatar src={user.avatar} color="--var(--secondary-color)" style={{ opacity: 0 }}></Avatar>
                        <TextInput
                            value={form.name}
                            size="32px"
                            fz="h1"
                            fw={900}
                            mt="12px"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <ActionIcon
                            ml="auto"
                            variant="subtle"
                            color="var(--secondary-color)"
                            onClick={() => {
                                dispatch(updateUserThunk(form));
                                navigate('/profile');
                            }}
                        >
                            <IconCircleCheck />
                        </ActionIcon>
                        <ActionIcon
                            ml="auto"
                            variant="subtle"
                            color="var(--secondary-color)"
                            onClick={() => navigate('/profile')}
                        >
                            <IconX />
                        </ActionIcon>
                    </Flex>
                </Card.Section>
                <Button color="red" onClick={open}>
                    Удалить профиль
                </Button>
                <Modal opened={opened} onClose={close} title="Удалить профиль">
                    <Text mb="md">
                        Ты уверен? Это действие нельзя отменить.
                    </Text>

                    <Flex gap="sm" justify="flex-end">
                        <Button variant="default" onClick={close}>
                            Отмена
                        </Button>

                        <Button color="red" onClick={handleDelete}>
                            Удалить
                        </Button>
                    </Flex>
                </Modal>
            </Card>
        </Box >
    );
};