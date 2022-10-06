import { UserContext } from 'data/contexts/UserContext';
import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from '../../TextInput/TextInput';

export const FinancialForm: React.FC = () => {
    const { user } = useContext(UserContext).userState;
    const { control } = useFormContext();

    return (
        <View>
            <Controller
                name="usuario.chave_pix"
                defaultValue={user.chave_pix}
                control={control}
                render={({ field }) => (
                    <TextInput
                        label={'Chave pix'}
                        value={field.value}
                        onChangeText={(value) => field.onChange(value)}
                    />
                )}
            />
        </View>
    );
};
