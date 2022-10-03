import { useState } from 'react';
import { Text } from 'react-native-paper';
import { ChipField } from 'ui/components/data-display/ChipField/ChipField';
import { DataList } from 'ui/components/data-display/DataList/DataList';
import { Status } from 'ui/components/data-display/Status/Status';
import { Dialog } from 'ui/components/feedback/Dialog/Dialog';
import { AutoComplete } from 'ui/components/inputs/AutoComplete/AutoComplete';
import { FileField } from 'ui/components/inputs/FileField/FileField';
import { ItemCounter } from 'ui/components/inputs/ItemCounter/ItemCounter';
import { ToggleButtonGroup } from 'ui/components/inputs/ToggleButtonGroup/ToggleButtonGroup';
import { BreadCrumb } from 'ui/components/navigation/BreadCrumb/BreadCrumb';

export const Contratacao: React.FC = () => {
    const [value, setValue] = useState('');
    const [chosenValue, setChosenValue] = useState('');

    return (
        <>
            <Status>Confirmado</Status>
            <ChipField itemsList={['asdsadasd', 'sadsad']} />
            <BreadCrumb
                items={['Detalhes', 'Identificação', 'Pagamento']}
                selected="Identificação"
            />
            <ToggleButtonGroup
                items={[
                    { label: 'asdasdsad', icon: 'cleaning-1', value: 1 },
                    { label: 'asdasdsad', icon: 'cleaning-2', value: 2 },
                    { label: 'asdasdsad', icon: 'cleaning-3', value: 3 },
                ]}
                value={2}
                onChange={() => {}}
            />
            <ItemCounter
                label="Sala"
                plural="Salas"
                counter={4}
                onIncrement={() => {}}
                onDecrement={() => {}}
            />
            <FileField onChange={() => {}} />
            <Dialog title="asdsad" onClose={() => {}}></Dialog>
            <DataList />
            <AutoComplete
                value={value}
                onChange={setValue}
                clearOnSelect
                onSelect={setChosenValue}
                label="Valor"
                options={['valor 1', 'valor 2', 'valor 3']}
            />
            <Text>{chosenValue}</Text>
        </>
    );
};
