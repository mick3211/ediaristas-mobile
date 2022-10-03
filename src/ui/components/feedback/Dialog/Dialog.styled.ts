import styled from '@emotion/native';
import { Dialog, Subheading } from 'react-native-paper';

export const DialogStyled = styled(Dialog)`
    flex: 1;
`;

export const DialogTitleStyled = styled(Dialog.Title)``;

export const DialogContentStyled = styled(Dialog.Content)`
    flex: 1;
    padding-top: ${({ theme }) => theme.spacing(2)};
`;

export const DialogActionsStyled = styled(Dialog.Actions)`
    height: 50px;
`;

export const Subtitle = styled(Subheading)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 14px;
    font-weight: bold;
    margin: ${({ theme }) => '0 0 ' + theme.spacing(3)};
`;
