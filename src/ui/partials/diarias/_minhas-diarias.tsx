import { useTheme } from '@emotion/react';
import type {
    DiariaInterface,
    DiariaStatus,
} from 'data/@types/DiariaInterface';
import { useMinhasDiarias } from 'data/hooks/pages/diarias/useMinhasDiarias.page';
import { DiariaService } from 'data/services/DiariaService';
import { TextFormatService } from 'data/services/TextFormatService';
import { ScrollView, Text, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { DataList } from 'ui/components/data-display/DataList/DataList';
import { PageTitle } from 'ui/components/data-display/PageTitle/PageTitle';
import { Button } from 'ui/components/inputs/Button/Button';
import {
    CancelDialog,
    ConfirmDialog,
    RatingDialog,
    SelectionDialog,
} from './_minhas-diarias-dialogs';
import { ButtonsContainer } from './_minhas-diarias.styled';

export const MinhasDiarias: React.FC = () => {
    const { colors } = useTheme();
    const {
        isMobile,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        totalPages,
        filteredData,
        podeVisualizar,
        diariaConfirmar,
        setDiariaConfirmar,
        podeConfirmar,
        confirmarDiarista,
        diariaAvaliar,
        setDiariaAvaliar,
        podeAvaliar,
        avaliarDiaria,
        diariaCancelar,
        setDiariaCancelar,
        podeCancelar,
        cancelarDiaria,
        filtro,
        alterarFiltro,
        diariaVisualizar,
        setDiariaVisualizar,
    } = useMinhasDiarias();

    return (
        <ScrollView>
            <PageTitle title="Minhas diárias" />
            <ButtonsContainer>
                <Button
                    onPress={() => alterarFiltro('pendentes')}
                    mode={filtro === 'pendentes' ? 'contained' : 'outlined'}
                >
                    Pendentes
                </Button>
                <Button
                    onPress={() => alterarFiltro('avaliadas')}
                    mode={filtro === 'avaliadas' ? 'contained' : 'outlined'}
                >
                    Avaliadas
                </Button>
                <Button
                    onPress={() => alterarFiltro('canceladas')}
                    mode={filtro === 'canceladas' ? 'contained' : 'outlined'}
                >
                    Canceladas
                </Button>
            </ButtonsContainer>

            {filteredData.length > 0 ? (
                <>
                    {filteredData.map((item) => (
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
                                </View>
                            }
                            body={
                                <>
                                    <Text style={{ color: 'white' }}>
                                        Status:{' '}
                                        {
                                            DiariaService.getStatus(
                                                item.status as DiariaStatus
                                            ).label
                                        }
                                    </Text>
                                    <Text style={{ color: 'white' }}>
                                        Valor:{' '}
                                        {TextFormatService.currency(item.preco)}
                                    </Text>
                                </>
                            }
                            actions={
                                <>
                                    {podeVisualizar(item) && (
                                        <Button
                                            mode="contained"
                                            color={colors.accent}
                                            onPress={() =>
                                                setDiariaVisualizar(item)
                                            }
                                        >
                                            Detalhes
                                        </Button>
                                    )}
                                    {podeCancelar(item) && (
                                        <Button
                                            mode="contained"
                                            color={colors.error}
                                            onPress={() =>
                                                setDiariaCancelar(item)
                                            }
                                        >
                                            Cancelar
                                        </Button>
                                    )}
                                    {podeConfirmar(item) && (
                                        <Button
                                            mode="contained"
                                            color={colors.success}
                                            onPress={() =>
                                                setDiariaConfirmar(item)
                                            }
                                        >
                                            Confirmar presença
                                        </Button>
                                    )}
                                    {podeAvaliar(item) && (
                                        <Button
                                            mode="contained"
                                            color={colors.success}
                                            onPress={() =>
                                                setDiariaAvaliar(item)
                                            }
                                        >
                                            Avaliar
                                        </Button>
                                    )}
                                </>
                            }
                        />
                    ))}
                </>
            ) : (
                <Paragraph style={{ textAlign: 'center', marginTop: 80 }}>
                    Nenhuma diária ainda
                </Paragraph>
            )}
            {diariaVisualizar.id && (
                <SelectionDialog
                    diaria={diariaVisualizar}
                    onConfirm={() => setDiariaVisualizar({} as DiariaInterface)}
                    onCancel={() => setDiariaVisualizar({} as DiariaInterface)}
                />
            )}

            {diariaConfirmar.id && (
                <ConfirmDialog
                    diaria={diariaConfirmar}
                    onConfirm={confirmarDiarista}
                    onCancel={() => setDiariaConfirmar({} as DiariaInterface)}
                />
            )}
            {diariaAvaliar.id && (
                <RatingDialog
                    diaria={diariaAvaliar}
                    onConfirm={avaliarDiaria}
                    onCancel={() => setDiariaAvaliar({} as DiariaInterface)}
                />
            )}
            {diariaCancelar.id && (
                <CancelDialog
                    diaria={diariaCancelar}
                    onConfirm={cancelarDiaria}
                    onCancel={() => setDiariaCancelar({} as DiariaInterface)}
                />
            )}
        </ScrollView>
    );
};
