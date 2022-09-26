import React from 'react';
import { Avatar } from 'react-native-paper';
import {
    InformationContainer,
    RatingStyled,
    UserDescription,
    UserInformationContainer,
    UserName,
} from './UserInformation.styled';

export interface UserInformationProps {
    picture?: string;
    name: string;
    rating: number;
    description?: string;
    darker?: boolean;
}

export const UserInformation: React.FC<UserInformationProps> = ({
    description,
    name,
    picture,
    rating,
    darker,
}) => {
    return (
        <UserInformationContainer darker={darker as boolean}>
            {picture ? (
                <Avatar.Image size={50} source={{ uri: picture }} />
            ) : (
                <Avatar.Text size={50} label={name[0]} />
            )}
            <InformationContainer>
                <UserName>{name}</UserName>
                <RatingStyled defaultRating={rating} />
                <UserDescription>{description}</UserDescription>
            </InformationContainer>
        </UserInformationContainer>
    );
};
