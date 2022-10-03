import { useTheme } from '@emotion/react';
import { TextColor } from 'data/@types/DiariaInterface';
import React from 'react';
import { StatusStyled } from './Status.styled';

interface StatusProps {
    children: React.ReactNode;
    color?: TextColor;
}

export const Status: React.FC<StatusProps> = ({
    children,
    color = 'success',
}) => {
    const { colors } = useTheme();

    return <StatusStyled bgColor={colors[color]}>{children}</StatusStyled>;
};
