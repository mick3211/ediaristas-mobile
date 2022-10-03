import React, { useMemo, useState } from 'react';
import { View, VirtualizedList } from 'react-native';
import { Dialog } from 'ui/components/feedback/Dialog/Dialog';
import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';

interface AutoCompleteProps {
    label: string;
    value: string;
    options: string[];
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    noOptionsText?: string;
    onChange: (value: string) => void;
    onSelect?: (value: string) => void;
    clearOnSelect?: boolean;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
    label,
    onChange,
    options = [],
    value,
    clearOnSelect,
    disabled = false,
    loading,
    loadingText,
    noOptionsText = 'Sem opções',
    onSelect,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredOptions = useMemo(
        () =>
            options.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase() || '')
            ),
        [options, value]
    );

    const selectItem = (item: string) => {
        onChange(clearOnSelect ? '' : item);
        onSelect && onSelect(item);
        setIsModalOpen(false);
    };

    return (
        <View>
            <TextInput
                label={label}
                value={value}
                onFocus={() => setIsModalOpen(true)}
                disabled={disabled}
            />
            <Dialog
                noConfirm
                // noCancel
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                <TextInput
                    autoFocus
                    label={label}
                    value={value}
                    onChangeText={onChange}
                    disabled={disabled}
                />
                <VirtualizedList
                    style={{ flex: 1 }}
                    data={filteredOptions}
                    initialNumToRender={10}
                    keyExtractor={(item) => item as string}
                    getItemCount={(data) => data.length}
                    renderItem={({ item }) => (
                        <Button
                            fullWidth
                            onPress={() => selectItem(item as string)}
                        >
                            {item as string}
                        </Button>
                    )}
                    getItem={(data, index) => data[index]}
                />
            </Dialog>
        </View>
    );
};
