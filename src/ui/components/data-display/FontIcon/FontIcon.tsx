import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import iconSelection from '@assets/fonts/tw-icons/selection.json';
import { useTheme } from '@emotion/react';

const Icon = createIconSetFromIcoMoon(iconSelection, 'TWF', 'twf.ttf');

interface FontIconProps {
    icon: TwIcon;
    color?: string;
    size?: number;
}

export const FontIcon: React.FC<FontIconProps> = ({ icon, color, size }) => {
    const [fontsLoaded] = useFonts({
        TWF: require('@assets/fonts/tw-icons/fonts/twf.ttf'),
    });
    const { colors } = useTheme();

    if (!fontsLoaded) return null;

    return <Icon name={icon} size={size || 16} color={color || colors.text} />;
};
