import styled from '@emotion/native';
import { View, ImageBackground } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { Button } from 'ui/components/inputs/Button/Button';
import { LinearGradient } from 'expo-linear-gradient';

export const MainContainer = styled(View)`
    flex: 1;
    justify-content: center;
    padding: 80px 8px;
`;

export const LoginContainer = styled(View)`
    flex: 1;
    justify-content: flex-end;
`;

export const RegisterContainer = styled(View)`
    flex: 1.4;
    justify-content: space-between;
`;

export const RegisterButtonsContainer = styled(View)`
    height: 120px;
    justify-content: space-between;
`;

export const RoundedButton = styled(Button)`
    border-radius: 50px;
    overflow: hidden;
`;

export const RoundedLoginButton = styled(RoundedButton)`
    background-color: white;
`;

export const TitleStyled = styled(Title)`
    text-align: center;
    text-shadow: 0px 3px 4px rgb(0, 0, 0, 0.25);
    color: white;
`;

export const ParagraphStyled = styled(Paragraph)`
    text-align: center;
    max-width: 300px;
    margin: 16px auto;
    color: white;
`;

export const BackgroundImage = styled(ImageBackground)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
`;

export const BackgroundGradient = styled(LinearGradient)`
    flex: 1;
    opacity: 0.9;
`;
