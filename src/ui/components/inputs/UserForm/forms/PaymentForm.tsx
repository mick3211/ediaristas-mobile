import { useTheme } from '@emotion/react';
import { PagamentoFormDataInterface } from 'data/@types/FormInterface';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { TextInput } from '../../TextInput/TextInput';
import { TextInputMask } from '../../TextInputMask/TextInputMask';

export const PaymentForm: React.FC = () => {
    const { colors } = useTheme();
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<PagamentoFormDataInterface>();

    useEffect(() => {
        register('pagamento.pagamento_recusado');
    }, []);

    return (
        <View>
            <Controller
                control={control}
                name="pagamento.numero_cartao"
                defaultValue=""
                render={({ field }) => (
                    <TextInputMask
                        mask="9999 9999 9999 9999"
                        keyboardType="number-pad"
                        label="Número do cartão"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.pagamento?.numero_cartao !== undefined}
                        helperText={errors.pagamento?.numero_cartao?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="pagamento.nome_cartao"
                defaultValue=""
                render={({ field }) => (
                    <TextInput
                        label="Nome no cartão"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.pagamento?.nome_cartao !== undefined}
                        helperText={errors.pagamento?.nome_cartao?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="pagamento.validade"
                defaultValue=""
                render={({ field }) => (
                    <TextInputMask
                        mask="99/99"
                        keyboardType="number-pad"
                        label="Validade"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.pagamento?.validade !== undefined}
                        helperText={errors.pagamento?.validade?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="pagamento.codigo"
                defaultValue=""
                render={({ field }) => (
                    <TextInputMask
                        mask="9999"
                        keyboardType="number-pad"
                        label="CVV"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.pagamento?.codigo !== undefined}
                        helperText={errors.pagamento?.codigo?.message}
                    />
                )}
            />

            {errors.pagamento?.pagamento_recusado !== undefined && (
                <Paragraph style={{ textAlign: 'center', color: colors.error }}>
                    {errors.pagamento.pagamento_recusado.message}
                </Paragraph>
            )}
        </View>
    );
};
