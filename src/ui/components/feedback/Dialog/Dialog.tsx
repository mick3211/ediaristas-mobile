import { useTheme } from '@emotion/react';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { Button } from 'ui/components/inputs/Button/Button';
import {
    DialogActionsStyled,
    DialogContentStyled,
    DialogStyled,
    DialogTitleStyled,
    Subtitle,
} from './Dialog.styled';

interface DialogProps {
    title?: string;
    subtitle?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    noConfirm?: boolean;
    noCancel?: boolean;
    children?: React.ReactNode;
    fullHeight?: boolean;
    onClose: () => void;
    isOpen?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    cancelLabel = 'Fechar',
    confirmLabel = 'Confirmar',
    noCancel,
    noConfirm,
    onCancel,
    onConfirm,
    subtitle,
    title,
    children,
    fullHeight,
}) => {
    const { colors } = useTheme();

    return (
        <Portal>
            <DialogStyled
                dismissable={!noCancel}
                visible={isOpen || false}
                onDismiss={onCancel || onClose}
            >
                {title && <DialogTitleStyled>{title}</DialogTitleStyled>}
                <DialogContentStyled>
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}
                    {fullHeight ? (
                        <ScrollView>{children}</ScrollView>
                    ) : (
                        children
                    )}
                </DialogContentStyled>
                {!(noConfirm && noCancel) && (
                    <DialogActionsStyled
                        style={{ height: fullHeight ? 50 : 'auto' }}
                    >
                        <View style={{ flex: 1 }} />
                        {!noCancel && (
                            <Button
                                mode="outlined"
                                style={{ flex: 2 }}
                                onPress={onCancel || onClose}
                            >
                                {cancelLabel}
                            </Button>
                        )}
                        {!noConfirm && (
                            <Button
                                mode="contained"
                                color={colors.accent}
                                style={{ flex: 2, marginLeft: 16 }}
                                onPress={onConfirm || onClose}
                            >
                                {confirmLabel}
                            </Button>
                        )}
                    </DialogActionsStyled>
                )}
            </DialogStyled>
        </Portal>
    );
};
