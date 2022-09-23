import styled from '@emotion/native';
import { Button } from 'react-native-paper';

export const ButtonStyled = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>`
    ${(props) => {
        if (props.mode === 'outlined') {
            return `border: 2px solid ${
                props.color || props.theme.colors?.primary
            };`;
        }
    }}
    max-width: 300px;
    margin: 0 auto;
    ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
`;

ButtonStyled.defaultProps = {
    dark: true,
    uppercase: false,
};
