import { useEffect } from 'react';
import { SimpleGrid, Container, Button, Center, Title } from '@mantine/core';
import { ServiceCard } from '../components/ServiceCard';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/UserStoreHook';
import { fetchServices, selectServices, selectServicesError, selectServicesLoading } from '../stores/slices/ServicesSlice';


export const FeedPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const services = useAppSelector(selectServices);
  const loading = useAppSelector(selectServicesLoading);
  const error = useAppSelector(selectServicesError);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  
  const gotoLanding = () => {
    navigate('/');
  };

    if (loading) {
    return <Center h="100vh">Loading...</Center>;
  }

  if (error) {
    return (
      <Center h="100vh">
        <Title order={3} c="var(--accent-color)">{error}</Title>
      </Center>
    );
  }


  return (
    <Container size="xl" py="xl">
     <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'center', marginBottom: '2vh'}}>
        <Button onClick={gotoLanding} h="100%" size="compact-md"
                variant="gradient"
                gradient={{ from: 'var(--secondary-color)', to: 'var(--accent-color)', deg: 90 }} >
          на главную
        </Button>
        <Title order={2} tt="uppercase" c="var(--secondary-color)">
          Доступные услуги
        </Title>
      </div>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing="lg"
      >
        {services.map((item) => (
          <ServiceCard key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
