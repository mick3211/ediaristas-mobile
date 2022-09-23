import { UserContext } from 'data/contexts/UserContext';
import { useCities } from 'data/hooks/useCities';
import { LocationService } from 'data/services/LocationService';
import { useContext, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export const useAddressForm = () => {
    const { userAddres, user } = useContext(UserContext).userState;
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();
    const [addressState, addressCity, addressCep] = watch([
        'endereco.estado',
        'endereco.cidade',
        'endereco.cep',
    ]);
    const estados = LocationService.estados();
    const listaCidades = useCities(addressState);
    const opcoesCidades = useMemo(
        () => listaCidades.map((item) => item.cidade),
        [listaCidades]
    );

    useEffect(() => {
        register('endereco.codigo_ibge');
    }, []);

    //seta codigo ibge ao alterar cidade no formulário
    useEffect(() => {
        if (addressCity) {
            const cidade = listaCidades.find(
                (item) => item.cidade === addressCity
            );
            if (cidade) {
                setValue('endereco.codigo_ibge', cidade.codigo_ibge);
            }
        }
    }, [addressCity]);

    useEffect(() => {
        const cep = (addressCep || '').replaceAll('_', '');

        if (cep.length === 9) {
            LocationService.cep(cep).then((newAddress) => {
                if (newAddress) {
                    newAddress.uf && setValue('endereco.estado', newAddress.uf);
                    newAddress.localidade &&
                        setValue('endereco.cidade', newAddress.localidade);
                    newAddress.ibge &&
                        setValue('endereco.codigo_ibge', newAddress.ibge);
                    newAddress.bairro &&
                        setValue('endereco.bairro', newAddress.bairro);
                    newAddress.logradouro &&
                        setValue('endereco.logradouro', newAddress.logradouro);
                }
            });
        }
    }, [addressCep]);

    return {
        userAddres,
        user,
        control,
        errors,
        estados,
        opcoesCidades,
        addressState,
        addressCep,
        addressCity,
        register,
    };
};
