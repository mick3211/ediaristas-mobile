import styled from '@emotion/native';
import { Text } from 'react-native';

export const StatusStyled = styled(Text, {
    shouldForwardProp: (propName) => propName !== 'bgColor',
})<{ bgColor: string }>`
    background-color: ${(props) => props.bgColor};
    border-radius: 4px;
    padding: ${({ theme }) => theme.spacing(0.5) + ' ' + theme.spacing(1.5)};
    font-size: 14px;
    color: white;
`;
