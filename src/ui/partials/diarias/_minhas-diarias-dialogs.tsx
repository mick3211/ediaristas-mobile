import { useTheme } from '@emotion/react';
import type { DiariaInterface } from 'data/@types/DiariaInterface';
import { UserType } from 'data/@types/UserInterface';
import { UserContext } from 'data/contexts/UserContext';
import { DateService } from 'data/services/DateService';
import { TextFormatService } from 'data/services/TextFormatService';
import React, { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Caption, Subheading, Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { UserInformation } from 'ui/components/data-display/UserInformation/UserInformation';
import { Dialog } from 'ui/components/feedback/Dialog/Dialog';
import { TextInput } from 'ui/components/inputs/TextInput/TextInput';

interface DialogProps {
    diaria: DiariaInterface;
    onConfirm: (diaria: DiariaInterface) => void;
    onCancel: () => void;
}

interface RatingDialogProps extends Omit<DialogProps, 'onConfirm'> {
    onConfirm: (
        diaria: DiariaInterface,
        avaliacao: { descricao: string; nota: number }
    ) => void;
}

interface CancelDialogProps extends Omit<DialogProps, 'onConfirm'> {
    onConfirm: (diaria: DiariaInterface, motivo: string) => void;
}

export const JobBox: React.FC<{ diaria: DiariaInterface }> = ({ diaria }) => {
    const { colors } = useTheme();

    return (
        <View>
            <Text style={{ color: colors.textSecondary }}>
                Data:{' '}
                <Text style={{ fontWeight: 'bold' }}>
                    {TextFormatService.reverseDate(
                        diaria.data_atendimento as string
                    )}{' '}
                    às{' '}
                    {DateService.getTimeFromDate(
                        diaria.data_atendimento as string
                    )}
                </Text>
            </Text>
            <Text style={{ color: colors.textSecondary }}>
                Endereço: {TextFormatService.getAdress(diaria)}
            </Text>
            <Text style={{ color: colors.textSecondary, fontWeight: 'bold' }}>
                Valor: {TextFormatService.currency(diaria.preco)}
            </Text>
        </View>
    );
};

export const SelectionDialog: React.FC<DialogProps> = ({
    diaria,
    onCancel,
    onConfirm,
}) => {
    return (
        <Dialog
            isOpen
            onConfirm={() => onConfirm(diaria)}
            onClose={onCancel}
            noConfirm
            subtitle={
                diaria.diarista
                    ? 'Selecionamos o(a) seguinte profissional para a sua diária'
                    : 'Detalhes da diária'
            }
        >
            <ScrollView>
                <JobBox diaria={diaria} />
                {diaria.diarista ? (
                    <UserInformation
                        name={diaria.diarista.nome_completo || ''}
                        rating={diaria.diarista.reputacao || 1}
                        picture={diaria.diarista.foto_usuario || ''}
                        description={
                            'Telefone: ' +
                            TextFormatService.formatPhoneNumber(
                                diaria.diarista.telefone || ''
                            )
                        }
                    />
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 32 }}>
                        Diarista ainda não selecionado(a)
                    </Text>
                )}
            </ScrollView>
        </Dialog>
    );
};

export const ConfirmDialog: React.FC<DialogProps> = ({
    diaria,
    onCancel,
    onConfirm,
}) => {
    return (
        <Dialog
            isOpen
            onConfirm={() => onConfirm(diaria)}
            onClose={onCancel}
            subtitle="Confirmar a prensença do(a) diarista abaixo?"
        >
            <ScrollView>
                <JobBox diaria={diaria} />
                <UserInformation
                    name={diaria.diarista.nome_completo || ''}
                    rating={diaria.diarista.reputacao || 1}
                    picture={diaria.diarista.foto_usuario || ''}
                    description={
                        'Telefone: ' +
                        TextFormatService.formatPhoneNumber(
                            diaria.diarista.telefone || ''
                        )
                    }
                />
                <Caption style={{ paddingTop: 16, paddingBottom: 16 }}>
                    Ao confirmar a presença do(a) diarista, você está definindo
                    que o serviço foi realizado em sua residência e autoriza a
                    plataforma a fazer o repasse do valor para o profissional.
                    Caso você tenha algum problema, pode entrar em contato com a
                    nossa equipe de suporte.
                </Caption>
            </ScrollView>
        </Dialog>
    );
};

export const RatingDialog: React.FC<RatingDialogProps> = ({
    diaria,
    onCancel,
    onConfirm,
}) => {
    const { user } = useContext(UserContext).userState;
    const usuarioAvaliado =
        user.tipo_usuario === UserType.Diarista
            ? diaria.cliente
            : diaria.diarista;
    const [descricao, setDescricao] = useState(''),
        [nota, setNota] = useState(3),
        [error, setError] = useState('');

    const TentarAvaliar = () => {
        if (descricao.length > 2) {
            onConfirm(diaria, { descricao, nota });
        } else {
            setError('Por favor, digite um depoimento');
        }
    };

    return (
        <Dialog
            isOpen
            onConfirm={TentarAvaliar}
            confirmLabel="Avaliar"
            onClose={onCancel}
            subtitle="Avalie a diária"
        >
            <ScrollView>
                <JobBox diaria={diaria} />
                <UserInformation
                    name={usuarioAvaliado.nome_completo || ''}
                    rating={usuarioAvaliado.reputacao || 1}
                    picture={usuarioAvaliado.foto_usuario || ''}
                    description={
                        'Telefone: ' +
                        TextFormatService.formatPhoneNumber(
                            usuarioAvaliado.telefone || ''
                        )
                    }
                />
                <Title>Deixe a sua avaliação</Title>
                <Subheading>Nota:</Subheading>
                <Rating
                    minValue={1}
                    imageSize={30}
                    startingValue={nota}
                    onFinishRating={setNota}
                />
                <Subheading style={{ marginTop: 32 }}>Depoimento:</Subheading>
                <TextInput
                    placeholder="Digite aqui seu depoimento"
                    multiline
                    numberOfLines={5}
                    value={descricao}
                    onChangeText={setDescricao}
                    error={error !== ''}
                    helperText={error}
                />
            </ScrollView>
        </Dialog>
    );
};

export const CancelDialog: React.FC<CancelDialogProps> = ({
    diaria,
    onCancel,
    onConfirm,
}) => {
    const { user } = useContext(UserContext).userState;
    const [motivo, setMotivo] = useState(''),
        [error, setError] = useState('');

    const TentarCancelar = () => {
        if (motivo.length > 5) {
            onConfirm(diaria, motivo);
        } else {
            setError('Por favor, digite um motivo para o cancelamento');
        }
    };

    function getAviso(): string {
        if (!user.nome_completo) return '';

        if (user.tipo_usuario === UserType.Diarista)
            return 'Ao cancelar uma diária, você pode ser penalizado(a) com a diminuição da sua reputação. Quanto menor a sua reputação, menor a chance de ser selecionado(a) para as próximas diárias. O cancelamento de diárias deve ser feito somente em situações de excessão';
        if (
            DateService.getDifferenceHours(new Date(diaria.data_atendimento)) <
            24
        )
            return 'Ao cancelar a diária, devido à proximidade com o horário agendado do serviço, será cobrada uma multa de 50% sobre o valor da diária. O cancelamento de diárias deve ser feito somente em situações de excessão.';
        return 'Ao cancelar a diária, o(a) profissional contratado(a) será prejudicado(a)... :`(';
    }

    return (
        <Dialog
            isOpen
            onConfirm={TentarCancelar}
            onClose={onCancel}
            subtitle="Tem certeza que deseja cancelar a diária?"
        >
            <ScrollView>
                <JobBox diaria={diaria} />

                <Subheading style={{ marginTop: 32 }}>Motivo:</Subheading>
                <TextInput
                    placeholder="Digite um motivo para o cancelamento"
                    multiline
                    numberOfLines={5}
                    value={motivo}
                    onChangeText={setMotivo}
                    error={error !== ''}
                    helperText={error}
                />
                <Caption>{getAviso()}</Caption>
            </ScrollView>
        </Dialog>
    );
};
