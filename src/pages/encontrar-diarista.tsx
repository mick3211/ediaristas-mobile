import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'ui/router/Router';
import { VerificarProfissionais } from '@partials/encontrar-diarista/_verificar-profissionais/verificar-profissionais';
import { Contratacao } from '@partials/encontrar-diarista/_contratacao/_contratacao';
import { useEncontrarDiarista } from 'data/hooks/pages/useEncontrarDiarista.page';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<
    RootStackParamList,
    'EncontrarDiarista'
>;

export const EncontrarDiarista: React.FC = () => {
    const { podeContratar, setPodeContratar } = useEncontrarDiarista();
    const navigation = useNavigation<NavigationProp>();

    const onDone = () => {
        // navigation.navigate('')
    };

    return (
        <>
            {!podeContratar ? (
                <VerificarProfissionais
                    onContratarProfissional={() => setPodeContratar(true)}
                />
            ) : (
                <Contratacao onDone={onDone} />
            )}
        </>
    );
};
