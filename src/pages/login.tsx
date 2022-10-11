import { useTheme } from '@emotion/react';
import { useLogin } from 'data/hooks/pages/useLogin.page';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Paragraph } from 'react-native-paper';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { Button } from 'ui/components/inputs/Button/Button';
import {
    LoginForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';

export const Login: React.FC = () => {
    const { colors } = useTheme();
    const { onSubmit, formMethods, errorMessage, externalServicesState } =
        useLogin();

    return (
        <UserFormContainer>
            <FormProvider {...formMethods}>
                <PageTitle title="Informe seu email e senha" />
                <LoginForm />
                <Paragraph
                    style={{
                        textAlign: 'center',
                        marginTop: 40,
                        color: colors.error,
                    }}
                >
                    {errorMessage}
                </Paragraph>
                <Button
                    mode="contained"
                    color={colors.accent}
                    fullWidth
                    onPress={formMethods.handleSubmit(onSubmit)}
                    style={{ marginTop: 32, marginBottom: 24 }}
                    disabled={
                        externalServicesState.externalServices.length === 0
                    }
                >
                    Entrar
                </Button>
            </FormProvider>
        </UserFormContainer>
    );
};
