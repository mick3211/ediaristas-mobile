import { ButtonsContainer } from '@partials/diarias/_minhas-diarias.styled';
import { usePagamentos } from 'data/hooks/pages/usePagamentos.page';
import { PaymentService } from 'data/services/PaymentService';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { DataList } from 'ui/components/data-display/DataList/DataList';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { Button } from 'ui/components/inputs/Button/Button';

export const Pagamentos: React.FC = () => {
    const { filtro, alterarFiltro, filteredData } = usePagamentos();

    return (
        <ScrollView>
            <PageTitle title="Pagamentos" />

            <ButtonsContainer>
                <Button
                    mode={filtro === 'pago' ? 'contained' : 'outlined'}
                    onPress={() =>
                        filtro === 'pago'
                            ? alterarFiltro('todos')
                            : alterarFiltro('pago')
                    }
                >
                    Pago
                </Button>
                <Button
                    mode={filtro === 'aguardando' ? 'contained' : 'outlined'}
                    onPress={() =>
                        filtro === 'aguardando'
                            ? alterarFiltro('todos')
                            : alterarFiltro('aguardando')
                    }
                >
                    Aguardando transferência
                </Button>
            </ButtonsContainer>

            {filteredData.length > 0 ? (
                filteredData.map((item) => (
                    <DataList
                        key={item.id}
                        header={
                            <View>
                                <Text>
                                    Data:{' '}
                                    {TextFormatService.reverseDate(
                                        item.created_at
                                    )}
                                </Text>
                            </View>
                        }
                        body={
                            <>
                                <Text style={{ color: 'white' }}>
                                    Status:{' '}
                                    {
                                        PaymentService.getStatus(item.status)
                                            .label
                                    }
                                </Text>
                                <Text style={{ color: 'white' }}>
                                    Valor da diária:{' '}
                                    {TextFormatService.currency(item.valor)}
                                </Text>
                                <Text style={{ color: 'white' }}>
                                    Valor depósito:{' '}
                                    {TextFormatService.currency(
                                        item.valor_deposito
                                    )}
                                </Text>
                            </>
                        }
                    />
                ))
            ) : (
                <Paragraph
                    style={{
                        paddingTop: 80,
                        textAlign: 'center',
                    }}
                >
                    Nenhum pagamento ainda
                </Paragraph>
            )}
        </ScrollView>
    );
};
