import React from 'react';
import { HelperTextStyled, TextInputStyled } from './TextInput.styled';
import { View } from 'react-native';
import { TextInputProps as RNPTextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

export interface TextInputProps extends Omit<RNPTextInputProps, 'theme'> {
    helperText?: string;
}

const TextInputElement: React.FC<TextInputProps> = ({
    helperText,
    ...props
}) => {
    return (
        <View>
            <TextInputStyled {...props} />
            {helperText ? (
                <HelperTextStyled type="error">{helperText}</HelperTextStyled>
            ) : null}
        </View>
    );
};

export const TextInput = React.forwardRef<any, TextInputProps>((props, ref) => (
    <View ref={ref}>
        <TextInputElement {...props} />
    </View>
));
