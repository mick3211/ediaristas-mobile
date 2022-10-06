import { CadastroClienteFormDataInterface } from 'data/@types/FormInterface';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from '../../TextInput/TextInput';

export const NewContactForm: React.FC = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<CadastroClienteFormDataInterface>();
    return (
        <View>
            <Controller
                name="usuario.email"
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        label={'Email'}
                        keyboardType="email-address"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.usuario?.email !== undefined}
                        helperText={errors.usuario?.email?.message}
                    />
                )}
            />
            <Controller
                name="usuario.password"
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        secureTextEntry
                        label={'Senha'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.usuario?.password !== undefined}
                        helperText={errors.usuario?.password?.message}
                    />
                )}
            />
            <Controller
                name="usuario.password_confirmation"
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        secureTextEntry
                        label={'Confirmação da senha'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={
                            errors.usuario?.password_confirmation !== undefined
                        }
                        helperText={
                            errors.usuario?.password_confirmation?.message
                        }
                    />
                )}
            />
        </View>
    );
};
