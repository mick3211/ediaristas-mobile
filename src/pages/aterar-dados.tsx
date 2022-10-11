import { UserInterface } from 'data/@types/UserInterface';
import { UserContext } from 'data/contexts/UserContext';
import { LoginService } from 'data/services/LoginService';
import { useContext } from 'react';
import { Button } from 'ui/components/inputs/Button/Button';

export const AlterarDados: React.FC = () => {
    const { userDispacth } = useContext(UserContext);

    function logout() {
        LoginService.logout();
        userDispacth({ type: 'SET_USER', payload: {} as UserInterface });
    }
    return (
        <>
            <Button onPress={logout}>Logout</Button>
        </>
    );
};
