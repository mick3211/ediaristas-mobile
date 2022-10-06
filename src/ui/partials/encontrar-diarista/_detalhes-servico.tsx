import { useTheme } from '@emotion/react';
import { NovaDiariaFormDataInterface } from 'data/@types/FormInterface';
import type { ServicoInterface } from 'data/@types/ServicoInterface';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Button } from 'ui/components/inputs/Button/Button';
import { ItemCounter } from 'ui/components/inputs/ItemCounter/ItemCounter';
import { TextInput } from 'ui/components/inputs/TextInput/TextInput';
import { TextInputMask } from 'ui/components/inputs/TextInputMask/TextInputMask';
import { ToggleButtonGroup } from 'ui/components/inputs/ToggleButtonGroup/ToggleButtonGroup';
import {
    AddressForm,
    FormFieldsetTitle,
} from 'ui/components/inputs/UserForm/UserForm';

export const houseParts = [
    {
        singular: 'Cozinha',
        plural: 'Cozinhas',
        name: 'quantidade_cozinhas',
    },
    {
        singular: 'Sala',
        plural: 'Salas',
        name: 'quantidade_salas',
    },
    {
        singular: 'Banheiro',
        plural: 'Banheiros',
        name: 'quantidade_banheiros',
    },
    {
        singular: 'Quarto',
        plural: 'Quartos',
        name: 'quantidade_quartos',
    },
    {
        singular: 'Quintal',
        plural: 'Quintais',
        name: 'quantidade_quintais',
    },
    {
        singular: 'Outro',
        plural: 'Outros',
        name: 'quantidade_outros',
    },
];

interface DetalhesServicoProps {
    servicos?: ServicoInterface[];
    podemosAtender?: boolean;
    comodos?: number;
    onSubmit: () => void;
}

export const DetalhesServico: React.FC<DetalhesServicoProps> = ({
    onSubmit,
    podemosAtender,
    comodos = 0,
    servicos = [],
}) => {
    const { colors } = useTheme();
    const {
        control,
        formState: { errors },
    } = useFormContext<NovaDiariaFormDataInterface>();

    return (
        <View>
            <FormFieldsetTitle style={{ marginTop: 0 }}>
                Qual tipo de limpeza você precisa?
            </FormFieldsetTitle>
            <Controller
                control={control}
                name="faxina.servico"
                defaultValue={servicos[0].id}
                render={({ field }) => (
                    <ToggleButtonGroup
                        value={field.value}
                        onChange={(value) =>
                            field.onChange(value || servicos[0].id)
                        }
                        items={servicos.map((item) => ({
                            label: item.nome,
                            icon: item.icone.replace('twf-', '') as TwIcon,
                            value: item.id,
                        }))}
                    />
                )}
            />
            <FormFieldsetTitle>Qual o tamanho da sua casa?</FormFieldsetTitle>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {houseParts.map((item) => (
                    <Controller
                        key={item.name}
                        control={control}
                        // @ts-ignore
                        name={'faxina.' + item.name}
                        defaultValue={0}
                        render={({ field }) => (
                            <ItemCounter
                                label={item.singular}
                                plural={item.plural}
                                counter={field.value as number}
                                onIncrement={() =>
                                    field.onChange(
                                        Math.min(
                                            100,
                                            (field.value as number) + 1
                                        )
                                    )
                                }
                                onDecrement={() =>
                                    field.onChange(
                                        Math.max(0, (field.value as number) - 1)
                                    )
                                }
                            />
                        )}
                    />
                ))}
            </View>
            <FormFieldsetTitle>
                Em qual data você gostaria de receber o(a) diarista?
            </FormFieldsetTitle>
            <Controller
                control={control}
                name={'faxina.data_atendimento'}
                defaultValue={''}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType="number-pad"
                        mask="99/99/9999"
                        label="Data"
                        value={field.value as string}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.faxina?.data_atendimento !== undefined}
                        helperText={errors.faxina?.data_atendimento?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name={'faxina.hora_inicio'}
                defaultValue={''}
                render={({ field }) => (
                    <TextInputMask
                        keyboardType="number-pad"
                        mask="99:99"
                        label="Hora de início"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.faxina?.hora_inicio !== undefined}
                        helperText={errors.faxina?.hora_inicio?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name={'faxina.hora_termino'}
                defaultValue={''}
                render={({ field }) => (
                    <TextInputMask
                        editable={false}
                        mask="99:99"
                        label="Hora de término (campo automático)"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.faxina?.hora_termino !== undefined}
                        helperText={errors.faxina?.hora_termino?.message}
                    />
                )}
            />
            <FormFieldsetTitle>Observações</FormFieldsetTitle>
            <Controller
                control={control}
                name={'faxina.observacoes'}
                defaultValue={''}
                render={({ field }) => (
                    <TextInput
                        label="Quer acrescentar algum detalhe?"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        multiline
                    />
                )}
            />
            <FormFieldsetTitle>
                Em qual endereço será realizada a limpeza?
            </FormFieldsetTitle>
            <AddressForm />
            {!podemosAtender && (
                <Text style={{ color: colors.error, marginBottom: 16 }}>
                    Infelizmente ainda não atendemos na sua região
                </Text>
            )}
            <Button
                mode="contained"
                color={colors.accent}
                disabled={!podemosAtender || comodos === 0}
                onPress={onSubmit}
            >
                Ir para indetificação
            </Button>
        </View>
    );
};
