import {
    BackgroundGradient,
    BackgroundImage,
    LoginContainer,
    MainContainer,
    ParagraphStyled,
    RegisterButtonsContainer,
    RegisterContainer,
    RoundedButton,
    RoundedLoginButton,
    TitleStyled,
} from '@styles/pages/index.styled';
import React from 'react';
import { View } from 'react-native';
import Background from '@assets/img/background/cleaning.jpg';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'ui/router/Router';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

export const Index: React.FC = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={{ flex: 1 }}>
            <MainContainer>
                <RegisterContainer>
                    <View>
                        <TitleStyled>Crie uma conta</TitleStyled>
                        <ParagraphStyled>
                            Você quer encontrar profissionais ou cadastrar seus
                            serviços?
                        </ParagraphStyled>
                    </View>
                    <RegisterButtonsContainer>
                        <RoundedButton
                            mode="contained"
                            fullWidth
                            onPress={() =>
                                navigation.navigate('EncontrarDiarista')
                            }
                        >
                            Encontrar Diarista
                        </RoundedButton>
                        <RoundedButton
                            mode="contained"
                            fullWidth
                            onPress={() => {}}
                        >
                            Ser Diarista
                        </RoundedButton>
                    </RegisterButtonsContainer>
                </RegisterContainer>
                <LoginContainer>
                    <RoundedLoginButton fullWidth onPress={() => {}}>
                        Já possuo conta
                    </RoundedLoginButton>
                </LoginContainer>
            </MainContainer>
            <BackgroundImage source={Background}>
                <BackgroundGradient
                    colors={[colors.secondary, colors.primary]}
                />
            </BackgroundImage>
        </View>
    );
};
