import { CidadeInterface } from 'data/@types/EnderecoInterface';
import { LocationService } from 'data/services/LocationService';
import { useEffect, useState } from 'react';

export function useCities(estado: string): CidadeInterface[] {
    const [listaCidades, setListaCidades] = useState<CidadeInterface[]>([]);

    useEffect(() => {
        if (estado) {
            setListaCidades([]);
            LocationService.cidades(estado).then(
                (cidades) => cidades && setListaCidades(cidades)
            );
        }
    }, [estado]);

    return listaCidades;
}
