import { useEffect, useState } from 'react';
import { SimpleGrid, Container, Button, Center, Title } from '@mantine/core';
import axios from 'axios';
import { ServiceCard } from '../components/ServiceCard';
import { useNavigate } from 'react-router-dom';

interface ServiceItem {
  id: number | string;
  title: string;
  description: string;
  price: number | string;
  imageUrl: string;
  category: string;
}

export const FeedPage = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const gotoLanding = () => {
    navigate('/');
  };



  useEffect(() => {
    axios.get<ServiceItem[]>('http://localhost:5000/services')
      .then(res => {
        setServices(res.data);
      })
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setError("Не удалось загрузить услуги(");
      });
  }, []);

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
          <ServiceCard
            key={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            category={item.category}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
