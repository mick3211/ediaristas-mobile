import { useTheme } from '@emotion/react';
import { LoginFormDataInterface } from 'data/@types/FormInterface';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, View, Linking } from 'react-native';
import { TextInput } from '../../TextInput/TextInput';

export const LoginForm: React.FC = () => {
    const { colors } = useTheme();
    const {
        control,
        formState: { errors },
    } = useFormContext<{ login: LoginFormDataInterface }>();
    return (
        <View>
            <Controller
                name="login.email"
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        label={'Email'}
                        keyboardType="email-address"
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.login?.email !== undefined}
                        helperText={errors.login?.email?.message}
                    />
                )}
            />
            <Controller
                name="login.password"
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <TextInput
                        secureTextEntry
                        label={'Senha'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                        error={errors.login?.password !== undefined}
                        helperText={errors.login?.password?.message}
                    />
                )}
            />

            <Text
                style={{
                    textAlign: 'right',
                    textDecorationLine: 'underline',
                    color: colors.textSecondary,
                }}
                onPress={() =>
                    Linking.openURL(
                        process.env['NEXT_PUBLIC_PASSWORD_RECOVERY_URL'] +
                            '/recuperar-senha'
                    )
                }
            >
                Esqueci minha senha
            </Text>
        </View>
    );
};
