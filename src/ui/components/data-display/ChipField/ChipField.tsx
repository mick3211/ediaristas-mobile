import { Paragraph } from 'react-native-paper';
import { ChipsContainer, ChipStyled } from './ChipField.styled';

const EMPTYMESSAGE = 'Nenhum item selecionado ainda';

interface ChipFieldProps {
    itemsList: string[];
    emptyMessage?: string;
    onDelete?: (item: string) => void;
}

export const ChipField: React.FC<ChipFieldProps> = ({
    itemsList,
    onDelete = () => {},
    emptyMessage = EMPTYMESSAGE,
}) => {
    return (
        <ChipsContainer>
            {itemsList.length ? (
                itemsList.map((item, index) => (
                    <ChipStyled key={index} onClose={() => onDelete(item)}>
                        {item}
                    </ChipStyled>
                ))
            ) : (
                <Paragraph>{emptyMessage}</Paragraph>
            )}
        </ChipsContainer>
    );
};
