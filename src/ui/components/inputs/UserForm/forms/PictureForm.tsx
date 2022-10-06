import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { FileField } from '../../FileField/FileField';

export const PictureForm: React.FC = () => {
    const { control } = useFormContext();
    return (
        <View>
            <Controller
                name={'usuario.foto_documento'}
                defaultValue=""
                control={control}
                render={({ field }) => (
                    <FileField onChange={(file) => field.onChange(file)} />
                )}
            />
        </View>
    );
};
