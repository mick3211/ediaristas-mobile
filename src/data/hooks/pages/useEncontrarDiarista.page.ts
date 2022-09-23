import { useState } from 'react';

export function useEncontrarDiarista() {
    const [podeContratar, setPodeContratar] = useState(false);

    return {
        podeContratar,
        setPodeContratar,
    };
}
