import { useTheme } from '@emotion/react';
import { FormContainer } from '@partials/encontrar-diarista/_verificar-profissionais/verificar-profissionais.styled';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { UserContext } from 'data/contexts/UserContext';
import { useAlterarDados } from 'data/hooks/pages/useAlterarDados.page';
import { LoginService } from 'data/services/LoginService';
import React, { useContext } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { Button } from 'ui/components/inputs/Button/Button';
import { FileField } from 'ui/components/inputs/FileField/FileField';
import {
    AddressForm,
    CitiesForm,
    ContactForm,
    FinancialForm,
    FormFieldsetTitle,
    UserDataForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';

export const AlterarDados: React.FC = () => {
    const { colors } = useTheme();
    const { userDispacth } = useContext(UserContext);
    const {
        formMethods,
        onSubmit,
        picture,
        setSnackMessage,
        snackMessage,
        user,
        userAddres,
        setPicture,
    } = useAlterarDados();

    function logout() {
        LoginService.logout();
        userDispacth({ type: 'SET_USER', payload: {} as UserInterface });
    }

    if (!user.nome_completo) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <>
            <ScrollView>
                <PageTitle title="Alterar dados cadastrais" />
                <UserFormContainer>
                    <FormProvider {...formMethods}>
                        <View style={{ marginBottom: 40 }}>
                            <Controller
                                control={formMethods.control}
                                name="usuario.foto_usuario"
                                defaultValue={picture as string}
                                render={({ field }) => (
                                    <FileField
                                        defaultValue={picture as string}
                                        onChange={(file) => {
                                            field.onChange([file]);
                                            setPicture(file);
                                        }}
                                    />
                                )}
                            />
                            <FormFieldsetTitle>
                                Dados pessoais
                            </FormFieldsetTitle>
                            <FormContainer>
                                <UserDataForm />
                            </FormContainer>
                        </View>

                        {user.tipo_usuario === UserType.Diarista && (
                            <View style={{ marginBottom: 40 }}>
                                <FormFieldsetTitle>
                                    Financeiro
                                </FormFieldsetTitle>
                                <FormContainer>
                                    <FinancialForm />
                                </FormContainer>
                            </View>
                        )}
                        <View style={{ marginBottom: 40 }}>
                            <FormFieldsetTitle>
                                Dados de acesso
                            </FormFieldsetTitle>
                            <FormContainer>
                                <ContactForm />
                            </FormContainer>
                        </View>
                        {user.tipo_usuario === UserType.Diarista && (
                            <>
                                <View style={{ marginBottom: 40 }}>
                                    <FormFieldsetTitle>
                                        Endereço
                                    </FormFieldsetTitle>
                                    <FormContainer>
                                        <AddressForm />
                                    </FormContainer>
                                </View>
                                <View style={{ marginBottom: 40 }}>
                                    <FormFieldsetTitle>
                                        Cidades atendidas
                                    </FormFieldsetTitle>
                                    <FormContainer>
                                        <CitiesForm
                                            estado={userAddres.estado}
                                        />
                                    </FormContainer>
                                </View>
                            </>
                        )}
                        <Button
                            mode="contained"
                            color={colors.accent}
                            onPress={formMethods.handleSubmit(onSubmit)}
                            fullWidth
                            style={{ marginBottom: 16 }}
                        >
                            Salvar
                        </Button>
                    </FormProvider>
                </UserFormContainer>
            </ScrollView>
            <Button onPress={logout} fullWidth>
                Logout
            </Button>
            <Snackbar
                visible={snackMessage.length > 0}
                onDismiss={() => setSnackMessage('')}
            >
                {snackMessage}
            </Snackbar>
        </>
    );
};
