import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import Logo from '@assets/img/logos/e-diaristas-logo.png';
import { NavigationTheme } from 'ui/themes/app-theme';
import { Index } from 'pages';

const Stack = createStackNavigator();

export const Router: React.FC = () => {
    return (
        <NavigationContainer theme={NavigationTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Image
                            source={Logo}
                            style={{
                                width: 150,
                                height: 50,
                                resizeMode: 'contain',
                            }}
                        />
                    ),
                }}
            >
                <Stack.Screen name="Index" component={Index} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};