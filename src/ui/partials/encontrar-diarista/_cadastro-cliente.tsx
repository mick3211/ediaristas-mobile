import { useTheme } from '@emotion/react';
import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { Button } from 'ui/components/inputs/Button/Button';
import {
    FormFieldsetTitle,
    NewContactForm,
    PictureForm,
    UserDataForm,
} from 'ui/components/inputs/UserForm/UserForm';

interface CadastroClienteProps {
    onBack: () => void;
    onSubmit: () => void;
}

export const CadastroCliente: React.FC<CadastroClienteProps> = ({
    onBack,
    onSubmit,
}) => {
    const { colors } = useTheme();

    return (
        <View>
            <FormFieldsetTitle style={{ marginTop: 0 }}>
                Envie uma selfie segurando o documento
            </FormFieldsetTitle>
            <Paragraph
                style={{
                    marginTop: -16,
                    marginBottom: 16,
                    textAlign: 'center',
                }}
            >
                Para a sua segurança, todos os profissionais e clientes precisam
                de uma foto. Ela não será vista por ninguém
            </Paragraph>
            <PictureForm />
            <FormFieldsetTitle>Dados pessoais</FormFieldsetTitle>
            <UserDataForm cadastro />
            <FormFieldsetTitle>Dados de acesso</FormFieldsetTitle>
            <NewContactForm />
            <View>
                <Button
                    mode="contained"
                    color={colors.accent}
                    onPress={onSubmit}
                    fullWidth
                    style={{ marginTop: 32, marginBottom: 24 }}
                >
                    Ir para pagamento
                </Button>
                <Button
                    mode="outlined"
                    color={colors.primary}
                    onPress={onBack}
                    fullWidth
                >
                    Voltar
                </Button>
            </View>
        </View>
    );
};
