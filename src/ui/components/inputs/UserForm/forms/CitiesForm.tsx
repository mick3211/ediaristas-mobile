import { useCitiesForm } from 'data/hooks/components/inputs/UserForm/forms/useCitiesForm';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ChipField } from 'ui/components/data-display/ChipField/ChipField';
import { AutoComplete } from '../../AutoComplete/AutoComplete';

interface CitiesFormProps {
    estado: string;
}

export const CitiesForm: React.FC<CitiesFormProps> = ({ estado }) => {
    const [city, setCity] = useState('');
    const { citiesList, citiesName, handleDelete, handleNewCity, options } =
        useCitiesForm(estado);

    return (
        <View>
            <AutoComplete
                value={city}
                onChange={setCity}
                clearOnSelect
                onSelect={handleNewCity}
                options={options.map((item) => item.cidade)}
                label="Busque pelo nome da cidade"
                loading={citiesList.length === 0}
                loadingText="Carregando cidades..."
                noOptionsText="Nenhuma cidade com esse nome"
            />
            <Text style={{ marginTop: 0, marginBottom: -8 }}>
                Cidades selecionadas
            </Text>
            <ChipField
                itemsList={citiesName}
                onDelete={handleDelete}
                emptyMessage="Nenhuma cidade selecionada ainda"
            />
        </View>
    );
};
