import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'ui/router/Router';
import { VerificarProfissionais } from '@partials/encontrar-diarista/_verificar-profissionais/verificar-profissionais';

type NavigationProp = StackNavigationProp<
    RootStackParamList,
    'EncontrarDiarista'
>;

export const EncontrarDiarista: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <>
            <VerificarProfissionais onContratarProfissional={() => {}} />
        </>
    );
};
