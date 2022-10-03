import { useTheme } from '@emotion/react';
import React from 'react';
import { FontIcon } from 'ui/components/data-display/FontIcon/FontIcon';
import {
    ItemCounterButton,
    ItemCounterContainer,
    ItemCounterTextContainer,
} from './ItemCounter.styled';

interface ItemCounterProps {
    label: string;
    plural?: string;
    counter: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export const ItemCounter: React.FC<ItemCounterProps> = ({
    counter,
    label,
    onDecrement,
    onIncrement,
    plural = counter,
}) => {
    const { colors } = useTheme();

    return (
        <ItemCounterContainer>
            <ItemCounterButton
                icon={() => <FontIcon color={colors.accent} icon="minus" />}
                onPress={onDecrement}
            />
            <ItemCounterTextContainer>
                {counter} {counter > 1 ? plural : label}
            </ItemCounterTextContainer>
            <ItemCounterButton
                icon={() => <FontIcon color={colors.accent} icon="plus" />}
                onPress={onIncrement}
            />
        </ItemCounterContainer>
    );
};
