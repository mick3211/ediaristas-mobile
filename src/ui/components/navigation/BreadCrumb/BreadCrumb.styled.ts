import styled from '@emotion/native';
import { Text } from 'react-native';

export const BreadCrumbConteiner = styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 0;
    margin-bottom: ${({ theme }) => theme.spacing(-1)};
`;

export const BreadCrumbItem = styled(Text, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>`
    flex: 1;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: ${({ theme }) => theme.spacing(1)};
    background-color: ${({ theme, isSelected }) =>
        theme.colors.grey[isSelected ? 200 : 100]};
`;
