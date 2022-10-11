import React from 'react';
import { List, Text } from 'react-native-paper';
import {
    AccordionActions,
    AccordionDetails,
    AccordionStyled,
} from './DataList.styled';

interface DataListProps {
    header?: React.ReactNode;
    body?: React.ReactNode;
    actions?: React.ReactNode;
}

export const DataList: React.FC<DataListProps> = ({
    actions,
    body,
    header,
}) => {
    return (
        <List.Section>
            <AccordionStyled title={header}>
                <AccordionDetails>
                    {body}
                    {actions && <AccordionActions>{actions}</AccordionActions>}
                </AccordionDetails>
            </AccordionStyled>
        </List.Section>
    );
};
