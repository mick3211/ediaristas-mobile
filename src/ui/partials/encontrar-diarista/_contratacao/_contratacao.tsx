import { useContratacao } from 'data/hooks/pages/useContratacao.page';
import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { UserFormContainer } from 'ui/components/inputs/UserForm/UserForm';
import { BreadCrumb } from 'ui/components/navigation/BreadCrumb/BreadCrumb';
import { FormProvider } from 'react-hook-form';
import { DetalhesServico } from '../_detalhes-servico';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { CadastroCliente } from '../_cadastro-cliente';
import { InformacoesPagamento } from '../_informacoes-pagamento';
import {
    ConfirmationContainer,
    ConfirmationParagraph,
    ConfirmationTitle,
} from './_contratacao.styled';
import { FontIcon } from 'ui/components/data-display/FontIcon/FontIcon';
import { useTheme } from '@emotion/react';
import { Button } from 'ui/components/inputs/Button/Button';
import { MobileViewService } from 'data/services/MobileViewService';
import { DataList } from 'ui/components/data-display/DataList/DataList';
import { Text } from 'react-native';
import { TextFormatService } from 'data/services/TextFormatService';

interface ContratacaoProps {
    onDone: () => void;
}

export const Contratacao: React.FC<ContratacaoProps> = ({ onDone }) => {
    const { colors } = useTheme();
    const ScrollViewRef = useRef<ScrollView>(null);
    const {
        breadCrumbItems,
        clientForm,
        hasLogin,
        loginError,
        loginForm,
        onClientFormSubmit,
        onLoginFormSubmit,
        onPaymentFormSubmit,
        onServiceFormSubmit,
        paymentForm,
        podemosAtender,
        serviceForm,
        servicos,
        setHasLogin,
        setStep,
        step,
        tamanhoCasa,
        tipoLimpeza,
        totalPrice,
    } = useContratacao();
    const dataAtendimento = serviceForm.watch('faxina.data_atendimento', '');

    useEffect(() => {
        setTimeout(() => {
            MobileViewService.scrollToTop(ScrollViewRef.current);
        }, 100);
    }, [step]);

    if (!servicos || servicos.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView ref={ScrollViewRef}>
            {step < 4 && (
                <BreadCrumb
                    items={breadCrumbItems}
                    selected={breadCrumbItems[step - 1]}
                />
            )}

            {[1, 2, 3].includes(step) && (
                <DataList
                    header={
                        <Text>
                            O valor total do servico é:{' '}
                            {TextFormatService.currency(totalPrice)}
                        </Text>
                    }
                    body={
                        <>
                            <Text style={{ color: 'white' }}>
                                Tipo da limpeza: {tipoLimpeza?.nome}
                            </Text>
                            <Text style={{ color: 'white' }}>
                                Tamanho: {tamanhoCasa.join(', ')}
                            </Text>
                            <Text style={{ color: 'white' }}>
                                Data: {dataAtendimento as string}{' '}
                            </Text>
                        </>
                    }
                />
            )}

            {step === 1 && (
                <PageTitle title="Nos conte um pouco sobre o serviço" />
            )}
            {step === 2 && (
                <PageTitle title="Precisamos conhecer um pouco sobre você!" />
            )}
            {step === 3 && (
                <PageTitle
                    title="Informe os dados do cartão para o pagamento"
                    subtitle="Será feita uma reserva, mas o valor só será descontado quando você confirmar a presença do profissional"
                />
            )}
            <UserFormContainer>
                <View style={{ display: step !== 1 ? 'none' : 'flex' }}>
                    <FormProvider {...serviceForm}>
                        <DetalhesServico
                            servicos={servicos}
                            comodos={tamanhoCasa.length}
                            podemosAtender={podemosAtender}
                            onSubmit={serviceForm.handleSubmit(
                                onServiceFormSubmit
                            )}
                        />
                    </FormProvider>
                </View>
                <View style={{ display: step !== 2 ? 'none' : 'flex' }}>
                    <FormProvider {...clientForm}>
                        <CadastroCliente
                            onBack={() => setStep(1)}
                            onSubmit={clientForm.handleSubmit(
                                onClientFormSubmit
                            )}
                        />
                    </FormProvider>
                </View>

                {step === 3 && (
                    <FormProvider {...paymentForm}>
                        <InformacoesPagamento
                            onSubmit={paymentForm.handleSubmit(
                                onPaymentFormSubmit
                            )}
                        />
                    </FormProvider>
                )}

                {step === 4 && (
                    <Portal>
                        <ConfirmationContainer>
                            <ConfirmationTitle>
                                Pagamento realizado com sucesso
                            </ConfirmationTitle>
                            <ConfirmationParagraph>
                                Vamos escolhes o melhor profissional para te
                                atender! Aguarde a nossa confirmação
                            </ConfirmationParagraph>
                            <FontIcon
                                icon="check-circle"
                                color={colors.accent}
                                size={145}
                            />
                            <Button
                                mode="contained"
                                color={colors.accent}
                                style={{ marginTop: 40 }}
                                fullWidth
                                onPress={onDone}
                            >
                                Ir para minhas diárias
                            </Button>
                        </ConfirmationContainer>
                    </Portal>
                )}
            </UserFormContainer>
        </ScrollView>
    );
};
