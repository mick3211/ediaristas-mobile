import { CidadeInterface } from 'data/@types/EnderecoInterface';
import { UserContext } from 'data/contexts/UserContext';
import { useCities } from 'data/hooks/useCities';
import { useContext, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export function useCitiesForm(estado: string) {
    const { adressList } = useContext(UserContext).userState;
    const { register, setValue, watch } = useFormContext();
    const listaCidades = useCities(estado);
    const enderecosAtendidos = watch('enderecosAtendidos', []);
    const citiesName = useMemo(() => {
        return (enderecosAtendidos || []).map(
            (item: CidadeInterface) => item.cidade
        );
    }, [enderecosAtendidos]);
    const options = useMemo(() => {
        return listaCidades.filter((item) => !citiesName.includes(item.cidade));
    }, [listaCidades, citiesName]);

    useEffect(() => {
        register('enderecosAtendidos', { value: [] });
    }, []);

    useEffect(() => {
        adressList.length && setValue('enderecosAtendidos', adressList);
    }, [adressList]);

    function handleNewCity(newValue: string | null) {
        if (newValue) {
            const newCity = options.find((item) => item.cidade === newValue);
            newCity &&
                setValue('enderecosAtendidos', [
                    ...enderecosAtendidos,
                    newCity,
                ]);
        }
    }

    function handleDelete(item: string) {
        setValue(
            'enderecosAtendidos',
            enderecosAtendidos.filter(
                (city: CidadeInterface) => city.cidade !== item
            )
        );
    }

    return {
        options,
        handleNewCity,
        handleDelete,
        citiesList: listaCidades,
        citiesName,
    };
}
