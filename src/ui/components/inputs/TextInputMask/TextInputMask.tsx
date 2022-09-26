import { TextInputMask as InputMask } from 'react-native-masked-text';
import { TextInputProps, TextInput } from '../TextInput/TextInput';

export interface TextInputMaskProps extends TextInputProps {
    mask: string;
}

export const TextInputMaks: React.FC<TextInputMaskProps> = ({
    mask,
    onChangeText,
    value,
    ...props
}) => {
    return (
        <InputMask
            type="custom"
            value={value}
            onChangeText={onChangeText}
            options={{ mask }}
            customTextInput={TextInput}
            customTextInputProps={props}
        />
    );
};
