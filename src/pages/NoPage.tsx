import { useNavigate } from 'react-router-dom';
import { Box, Button } from "@mantine/core";

export const NoPage = () => {
    const navigate = useNavigate();
    const gotoLanding = () => {
        navigate('/');
    };

    return (
        <Box  w="clamp(300px, 90vw, 2100px)" mx="auto" mt="xl">
            <h1>404</h1>
            <h2>Not Found :(</h2> <br />
            
            <Button onClick={gotoLanding} h="" size="compact-md"
                variant="gradient"
                gradient={{ from: 'var(--secondary-color)', to: 'var(--accent-color)', deg: 90 }} >
                на главную
            </Button>
        </Box>
    )
}