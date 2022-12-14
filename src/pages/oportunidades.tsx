import { useTheme } from '@emotion/react';
import { JobBox } from '@partials/diarias/_minhas-diarias-dialogs';
import type { DiariaInterface } from 'data/@types/DiariaInterface';
import { useOportunidadesPage } from 'data/hooks/pages/useOportunidades.page';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Caption, Paragraph } from 'react-native-paper';
import { DataList } from 'ui/components/data-display/DataList/DataList';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { UserInformation } from 'ui/components/data-display/UserInformation/UserInformation';
import { Dialog } from 'ui/components/feedback/Dialog/Dialog';
import { Button } from 'ui/components/inputs/Button/Button';

export const Oportunidades: React.FC = () => {
    const { colors } = useTheme();
    const {
        oportunidadeSelecionada,
        oportunidades,
        podeCandidatar,
        setOportunidadeselecionada,
        totalComodos,
        seCandidatar,
    } = useOportunidadesPage();

    return (
        <ScrollView>
            <PageTitle title="Oportunidades de trabalho" />

            {oportunidades.length > 0 ? (
                <>
                    {oportunidades.map((item) => (
                        <DataList
                            key={item.id}
                            header={
                                <View>
                                    <Text>
                                        Data:{' '}
                                        {TextFormatService.reverseDate(
                                            item.data_atendimento as string
                                        )}
                                    </Text>
                                    <Text>{item.nome_servico}</Text>
                                    <Text>
                                        {TextFormatService.currency(item.preco)}
                                    </Text>
                                </View>
                            }
                            body={
                                <>
                                    <Text style={{ color: 'white' }}>
                                        Cidade: {item.cidade}
                                    </Text>
                                    <Text style={{ color: 'white' }}>
                                        N??mero de c??modos: {totalComodos(item)}
                                    </Text>
                                </>
                            }
                            actions={
                                <>
                                    {podeCandidatar(item) && (
                                        <Button
                                            color={colors.accent}
                                            mode="contained"
                                            onPress={() =>
                                                setOportunidadeselecionada(item)
                                            }
                                        >
                                            Se candidatar
                                        </Button>
                                    )}
                                </>
                            }
                        />
                    ))}
                </>
            ) : (
                <Paragraph style={{ paddingTop: 80, textAlign: 'center' }}>
                    Nenhuma oportunidade ainda
                </Paragraph>
            )}
            {oportunidadeSelecionada !== undefined && (
                <Dialog
                    isOpen
                    onClose={() => setOportunidadeselecionada(undefined)}
                    subtitle="Tem certeza que deseja se candidatar ?? di??ria abaixo?"
                    onConfirm={() =>
                        oportunidadeSelecionada &&
                        seCandidatar(oportunidadeSelecionada)
                    }
                >
                    <ScrollView>
                        <JobBox
                            diaria={oportunidadeSelecionada as DiariaInterface}
                        />
                        <UserInformation
                            name={oportunidadeSelecionada.cliente.nome_completo}
                            rating={
                                oportunidadeSelecionada.cliente.reputacao || 0
                            }
                            picture={
                                oportunidadeSelecionada.cliente.foto_usuario
                            }
                        />
                        {oportunidadeSelecionada.avaliacoes_clientes.length >
                            0 && (
                            <DataList
                                header={
                                    <Text>??ltimas avalia????es do cliente:</Text>
                                }
                                body={oportunidadeSelecionada.avaliacoes_clientes.map(
                                    (item, index) => (
                                        <UserInformation
                                            key={index}
                                            name={item.nome_avaliador}
                                            picture={item.foto_avaliador}
                                            rating={item.nota}
                                            description={item.descricao}
                                        />
                                    )
                                )}
                            />
                        )}
                        <Caption>
                            Ao se candidatar, voc?? n??o ?? o(a) diarista
                            escolhido(a) para realizar o trabalho. Vamos
                            analisar suas qualifica????es e d a dist??ncia para o
                            local da di??ria. Caso voc?? seja a pessoa
                            selecionada, receber?? um email avisando. Atente-se ??
                            sua caixa de entrada!
                        </Caption>
                    </ScrollView>
                </Dialog>
            )}
        </ScrollView>
    );
};
