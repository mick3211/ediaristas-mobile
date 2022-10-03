import { useTheme } from '@emotion/react';
import React from 'react';
import { FontIcon } from 'ui/components/data-display/FontIcon/FontIcon';
import {
    ToggleButtonGroupStyled,
    ToggleButtonStyled,
    ToggleButtonText,
} from './ToggleButtonGroup.styed';

interface ToggleButtonGroupProps {
    items: { label: string; icon: TwIcon; value: any }[];
    value: any;
    onChange: (value: any) => void;
}

export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
    items = [],
    onChange,
    value,
}) => {
    const { colors } = useTheme();

    return (
        <ToggleButtonGroupStyled>
            {items.map((item) => (
                <ToggleButtonStyled
                    key={item.value}
                    status={item.value === value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(item.value)}
                >
                    <>
                        <FontIcon
                            icon={item.icon}
                            size={25}
                            color={
                                item.value === value
                                    ? 'white'
                                    : colors.textSecondary
                            }
                        />
                        <ToggleButtonText
                            style={{
                                color:
                                    item.value === value
                                        ? 'white'
                                        : colors.textSecondary,
                            }}
                        >
                            {item.label}
                        </ToggleButtonText>
                    </>
                </ToggleButtonStyled>
            ))}
        </ToggleButtonGroupStyled>
    );
};
