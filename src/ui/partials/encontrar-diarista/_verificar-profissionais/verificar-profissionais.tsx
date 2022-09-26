import { useTheme } from '@emotion/react';
import useVerificarProfissionais from 'data/hooks/pages/useVerificarProfissionais.page';
import useVerificarProfissionaisMobile from 'data/hooks/pages/useVerificarProfissionais.page.mobile';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { UserInformation } from 'ui/components/data-display/UserInformation/UserInformation';
import { Button } from 'ui/components/inputs/Button/Button';
import { TextInputMaks } from 'ui/components/inputs/TextInputMask/TextInputMask';
import {
    ErrorText,
    FormContainer,
    ResponseContainer,
    TextContainer,
} from './verificar-profissionais.styled';

interface VerificarProfissionaisProps {
    onContratarProfissional: () => void;
}

export const VerificarProfissionais: React.FC<VerificarProfissionaisProps> = ({
    onContratarProfissional,
}) => {
    const { colors } = useTheme();
    const { cepAutomatico } = useVerificarProfissionaisMobile();
    const {
        buscaFeita,
        buscarProfissionais,
        cep,
        cepValido,
        diaristas,
        diaristasRestantes,
        error,
        isLoading,
        setCep,
    } = useVerificarProfissionais();

    useEffect(() => {
        if (cepAutomatico && !cep) {
            setCep(cepAutomatico);
            buscarProfissionais(cepAutomatico);
        }
    }, [cepAutomatico]);

    return (
        <ScrollView>
            <PageTitle
                title="Conheça os profissionais"
                subtitle="Preencha o seu endereço e veja os profissionais da sua localidade"
            />
            <FormContainer>
                <TextInputMaks
                    label="Digite seu CEP"
                    mask="99.999-999"
                    keyboardType="number-pad"
                    value={cep}
                    onChangeText={setCep}
                />
                {error ? <ErrorText>Cep não encontrado</ErrorText> : null}
                <Button
                    color={colors.accent}
                    mode="contained"
                    fullWidth
                    style={{ marginTop: 32 }}
                    onPress={() => buscarProfissionais(cep)}
                    loading={isLoading}
                    disabled={!cepValido || isLoading}
                >
                    Buscar
                </Button>
            </FormContainer>
            {buscaFeita &&
                (diaristas.length > 0 ? (
                    <ResponseContainer>
                        {diaristas.map((item, index) => (
                            <UserInformation
                                key={index}
                                picture={item.foto_usuario || ''}
                                name={item.nome_completo}
                                rating={item.reputacao || 0}
                                description={item.cidade}
                                darker={index % 2 === 1}
                            />
                        ))}

                        {diaristasRestantes > 0 && (
                            <TextContainer>
                                ... e mais{' '}
                                {diaristasRestantes +
                                    ` ${
                                        diaristasRestantes > 1
                                            ? ' profissionais atendem'
                                            : ' profissional atende'
                                    } ao seu endereço`}
                            </TextContainer>
                        )}
                        <Button
                            color={colors.accent}
                            mode="contained"
                            fullWidth
                            style={{ marginTop: 32 }}
                            onPress={onContratarProfissional}
                        >
                            Contratar um profissional
                        </Button>
                    </ResponseContainer>
                ) : (
                    <TextContainer>
                        Ainda não temos nenhum diarista disponível na sua região
                    </TextContainer>
                ))}
        </ScrollView>
    );
};
