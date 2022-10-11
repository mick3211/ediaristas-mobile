import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import Logo from '@assets/img/logos/e-diaristas-logo.png';
import { NavigationTheme } from 'ui/themes/app-theme';
import { Index } from 'pages';
import { EncontrarDiarista } from 'pages/encontrar-diarista';
import { FontIcon } from 'ui/components/data-display/FontIcon/FontIcon';
import { Login } from 'pages/login';
import { Diarista } from 'pages/cadastro/diarista';
import { UserContext } from 'data/contexts/UserContext';
import { ForceUserState, UserType } from 'data/@types/UserInterface';
import { Oportunidades } from 'pages/oportunidades';
import { Diarias } from 'pages/diarias';
import { Pagamentos } from 'pages/pagamentos';
import { AlterarDados } from 'pages/aterar-dados';
import { useTheme } from '@emotion/react';
import { ActivityIndicator } from 'react-native-paper';

export type RootStackParamList = {
    Index: undefined;
    EncontrarDiarista: undefined;
    CadastroDirista: undefined;
    Login: undefined;
};

export type RootTabParamList = {
    Diarias: undefined;
    AlterarDados: undefined;
    Oportunidades: undefined;
    Pagamentos: undefined;
    EncontrarDiarista: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const SCREEN_OPTIONS = {
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
};

function getIcon(
    iconName: TwIcon
): (props: { color: string; size: number }) => React.ReactElement {
    return ({ color, size }) => (
        <FontIcon icon={iconName} color={color} size={size} />
    );
}

const PrivateRoute = () => {
    const { user } = useContext(UserContext).userState;
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={
                {
                    ...SCREEN_OPTIONS,
                    tabBarItemStyle: {
                        paddingTop: 4,
                        paddingBottom: 4,
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: colors.grey[50],
                    tabBarActiveBackgroundColor: colors.primary,
                    tabBarInactiveTintColor: colors.grey[300],
                } as BottomTabNavigationOptions
            }
        >
            {user.tipo_usuario === UserType.Diarista && (
                <Tab.Screen
                    name="Oportunidades"
                    component={Oportunidades}
                    options={{
                        tabBarIcon: getIcon('search'),
                    }}
                />
            )}
            <Tab.Screen
                name="Diarias"
                component={Diarias}
                options={{
                    title: 'Diárias',
                    tabBarIcon: getIcon('check-circle'),
                }}
            />
            {user.tipo_usuario === UserType.Diarista ? (
                <Tab.Screen
                    name="Pagamentos"
                    component={Pagamentos}
                    options={{
                        tabBarIcon: getIcon('credit-card'),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="EncontrarDiarista"
                    component={EncontrarDiarista}
                    options={{
                        title: 'Encontrar Diarista',
                        tabBarIcon: getIcon('search'),
                    }}
                />
            )}
            <Tab.Screen
                name="AlterarDados"
                component={AlterarDados}
                options={{
                    title: 'Alterar Dados',
                    tabBarIcon: getIcon('woman'),
                }}
            />
        </Tab.Navigator>
    );
};

const PublicRoute = () => {
    return (
        <Stack.Navigator
            screenOptions={SCREEN_OPTIONS as StackNavigationOptions}
        >
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen
                name="EncontrarDiarista"
                component={EncontrarDiarista}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CadastroDirista" component={Diarista} />
        </Stack.Navigator>
    );
};

export const Router: React.FC = () => {
    const { userState } = useContext(UserContext);
    const { forceUserState } = userState;
    const logado = userState.user?.nome_completo?.length > 0;

    if (userState.isLogging && forceUserState === ForceUserState.none) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <NavigationContainer theme={NavigationTheme}>
            {(!logado || forceUserState === ForceUserState.unauthenticated) && (
                <PublicRoute />
            )}
            {logado && forceUserState === ForceUserState.none && (
                <PrivateRoute />
            )}
        </NavigationContainer>
    );
};
