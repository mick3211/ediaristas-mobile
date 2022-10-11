import { useTheme } from '@emotion/react';
import { Text } from 'react-native';
import { useCadastroDiarista } from 'data/hooks/pages/cadastro/useCadastroDiarista.page';
import { MobileViewService } from 'data/services/MobileViewService';
import React, { useContext, useEffect, useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { Dialog } from 'ui/components/feedback/Dialog/Dialog';
import { Button } from 'ui/components/inputs/Button/Button';
import {
    AddressForm,
    CitiesForm,
    FinancialForm,
    FormFieldsetTitle,
    NewContactForm,
    PictureForm,
    UserDataForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';
import { BreadCrumb } from 'ui/components/navigation/BreadCrumb/BreadCrumb';
import { LoginService } from 'data/services/LoginService';
import { UserContext } from 'data/contexts/UserContext';

export const Diarista: React.FC = () => {
    const { colors } = useTheme();
    const { userDispacth } = useContext(UserContext);
    const ScrollViewRef = useRef<ScrollView>(null);
    const {
        addressListForm,
        breadcrumbItems,
        enderecosAtendidos,
        isWaitingResponse,
        newAddress,
        onAddressSubmit,
        onUserSubmit,
        step,
        sucessoCadastro,
        userForm,
    } = useCadastroDiarista();

    const onDone = async () => {
        const user = await LoginService.getUser();

        userDispacth({ type: 'SET_USER', payload: user });
    };

    useEffect(() => {
        setTimeout(() => {
            MobileViewService.scrollToTop(ScrollViewRef.current);
        }, 100);
    }, [step]);

    return (
        <ScrollView ref={ScrollViewRef}>
            <BreadCrumb
                items={breadcrumbItems}
                selected={breadcrumbItems[step - 1]}
            />
            {step === 1 && (
                <PageTitle title="Precisamos conhecer um pouco melhor sobre você!" />
            )}
            {step === 2 && (
                <PageTitle
                    title="Quais cidades você atenderá?"
                    subtitle="Você pode escolher se aceita ou não um serviço. Então, não se preocupe se mora em uma grande cidade"
                />
            )}
            <UserFormContainer>
                <View style={{ display: step !== 1 ? 'none' : 'flex' }}>
                    <FormProvider {...userForm}>
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
                            Para a sua segurança, todos os profissionais e
                            clientes precisam de uma foto. Ela não será vista
                            por ninguém
                        </Paragraph>
                        <PictureForm />
                        <FormFieldsetTitle>Dados pessoais</FormFieldsetTitle>
                        <UserDataForm cadastro />
                        <FormFieldsetTitle>Financeiro</FormFieldsetTitle>
                        <FinancialForm />
                        <FormFieldsetTitle>Endereço</FormFieldsetTitle>
                        <AddressForm />
                        <FormFieldsetTitle>Dados de acesso</FormFieldsetTitle>
                        <NewContactForm />
                        <View>
                            <Button
                                mode="contained"
                                color={colors.accent}
                                onPress={userForm.handleSubmit(onUserSubmit)}
                                fullWidth
                                style={{ marginTop: 32, marginBottom: 24 }}
                                disabled={isWaitingResponse}
                            >
                                Cadastrar e escolher cidades
                            </Button>
                        </View>
                    </FormProvider>
                </View>

                <View style={{ display: step !== 2 ? 'none' : 'flex' }}>
                    <FormProvider {...addressListForm}>
                        <FormFieldsetTitle>
                            Selecione as cidades
                        </FormFieldsetTitle>
                        {newAddress && (
                            <CitiesForm estado={newAddress.estado} />
                        )}

                        <Button
                            mode="contained"
                            color={colors.accent}
                            onPress={addressListForm.handleSubmit(
                                onAddressSubmit
                            )}
                            fullWidth
                            style={{ marginTop: 32, marginBottom: 24 }}
                            disabled={
                                isWaitingResponse ||
                                enderecosAtendidos === undefined ||
                                enderecosAtendidos.length === 0
                            }
                        >
                            Finalizar o cadastro
                        </Button>
                    </FormProvider>
                </View>

                <Dialog
                    isOpen={sucessoCadastro}
                    title="Cadastro realizado com sucesso"
                    noCancel
                    confirmLabel="Ver oportunidades"
                    onClose={() => {}}
                    onConfirm={onDone}
                >
                    <Text>
                        Agora você pode visualizar as oportunidades disponíveis
                        na sua região
                    </Text>
                </Dialog>
            </UserFormContainer>
        </ScrollView>
    );
};
