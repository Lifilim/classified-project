import { useEffect, useState } from 'react';
import { SimpleGrid, Container, Button, Center, Title } from '@mantine/core';
import axios from 'axios';
import { ServiceCard } from '../components/ServiceCard';
// import { useNavigate } from 'react-router-dom';

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
  

  useEffect(() => {
    axios.get<ServiceItem[]>('http://localhost:5000/services') 
      .then(res => {
        setServices(res.data);
      })
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setError("Не удалось загрузить услуги");
      });
  }, []);

  if (error) {
    return (
      <Center h="100vh">
        <Title order={3} c="red">{error}</Title>
      </Center>
    );
  }

  
  // const navigate = useNavigate();
  //     const gotoFeed = () => {
  //         navigate('/feed'); 
  //     };

  return (
    <Container size="xl" py="xl">
      <Title order={2} tt="uppercase" mb="xl" c="var(--secondary-color)">
        Доступные услуги
      </Title>

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
      {/* <Button onClick={gotoFeed} variant="outline" color="var(--text-color)" size="xl"> 
                    на главную
      </Button> */}
    </Container>
    
  );
};
