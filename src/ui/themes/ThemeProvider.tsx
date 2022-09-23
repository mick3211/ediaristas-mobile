import { ThemeProvider as EmotionProvider } from '@emotion/react';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import AppTheme from './app-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <EmotionProvider theme={AppTheme}>
            <PaperProvider theme={AppTheme}>{children}</PaperProvider>
        </EmotionProvider>
    );
};
