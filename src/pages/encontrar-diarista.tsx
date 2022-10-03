import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'ui/router/Router';
import { VerificarProfissionais } from '@partials/encontrar-diarista/_verificar-profissionais/verificar-profissionais';
import { Contratacao } from '@partials/encontrar-diarista/_contratacao/_contratacao';
import { useEncontrarDiarista } from 'data/hooks/pages/useEncontrarDiarista.page';

type NavigationProp = StackNavigationProp<
    RootStackParamList,
    'EncontrarDiarista'
>;

export const EncontrarDiarista: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { podeContratar, setPodeContratar } = useEncontrarDiarista();

    return (
        <>
            {podeContratar ? (
                <VerificarProfissionais
                    onContratarProfissional={() => setPodeContratar(true)}
                />
            ) : (
                <Contratacao />
            )}
        </>
    );
};
