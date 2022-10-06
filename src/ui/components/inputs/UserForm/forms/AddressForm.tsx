import { useTheme } from '@emotion/react';
import { PagamentoFormDataInterface } from 'data/@types/FormInterface';
import { UserType } from 'data/@types/UserInterface';
import { useAddressForm } from 'data/hooks/components/inputs/UserForm/forms/useAddressForm';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, Paragraph } from 'react-native-paper';
import { AutoComplete } from '../../AutoComplete/AutoComplete';
import { TextInput } from '../../TextInput/TextInput';
import { TextInputMask } from '../../TextInputMask/TextInputMask';

export const AddressForm: React.FC = () => {
    const {
        addressCep,
        addressCity,
        addressState,
        control,
        errors,
        estados,
        opcoesCidades,
        user,
        userAddres,
    } = useAddressForm();

    if (
        !user.nome_completo &&
        user.tipo_usuario === UserType.Diarista &&
        !userAddres.estado
    ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <View>
            <Controller
                control={control}
                name="endereco.cep"
                defaultValue={userAddres.cep}
                render={({ field }) => (
                    <TextInputMask
                        mask="99999-999"
                        keyboardType="number-pad"
                        label="CEP"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.endereco?.cep !== undefined}
                        helperText={errors.endereco?.cep?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="endereco.estado"
                defaultValue={userAddres.estado}
                render={({ field }) => (
                    <AutoComplete
                        value={field.value}
                        options={estados.map((item) => item.sigla)}
                        onChange={field.onChange}
                        label="Estado"
                        loading={estados.length === 0}
                        loadingText="Carregando estados..."
                        noOptionsText="Nenhum estado com esse nome"
                    />
                )}
            />
            <Controller
                control={control}
                name="endereco.cidade"
                defaultValue={userAddres.cidade}
                render={({ field }) => (
                    <AutoComplete
                        value={field.value}
                        options={opcoesCidades}
                        onChange={field.onChange}
                        label="Cidade"
                        loading={opcoesCidades.length === 0 || !addressState}
                        loadingText="Carregando cidades..."
                        noOptionsText="Nenhuma cidade com esse nome"
                    />
                )}
            />
            <Controller
                control={control}
                name="endereco.bairro"
                defaultValue={userAddres.bairro}
                render={({ field }) => (
                    <TextInput
                        label="Bairro"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.endereco?.bairro !== undefined}
                        helperText={errors.endereco?.bairro?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="endereco.logradouro"
                defaultValue={userAddres.logradouro}
                render={({ field }) => (
                    <TextInput
                        label="Logradouro"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.endereco?.logradouro !== undefined}
                        helperText={errors.endereco?.logradouro?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="endereco.numero"
                defaultValue={userAddres.numero}
                render={({ field }) => (
                    <TextInput
                        label="Número"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.endereco?.numero !== undefined}
                        helperText={errors.endereco?.numero?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="endereco.complemento"
                defaultValue={userAddres.complemento}
                render={({ field }) => (
                    <TextInput
                        label="Complemento"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.endereco?.complemento !== undefined}
                        helperText={errors.endereco?.complemento?.message}
                    />
                )}
            />
        </View>
    );
};
