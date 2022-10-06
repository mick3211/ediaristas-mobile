import styled from '@emotion/native';
import { IconButton } from 'react-native-paper';

export const ItemCounterContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

export const ItemCounterTextContainer = styled.Text`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    padding: ${({ theme }) => theme.spacing()};
    margin: ${({ theme }) => theme.spacing(2) + ' ' + theme.spacing(-3)};
`;

export const ItemCounterButton = styled(IconButton)`
    border: 2px solid ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.background};
    z-index: 1;
`;
