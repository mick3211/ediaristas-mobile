import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useVerificarProfissionais() {
    const [cepAutomatico, setCepAutomatico] = useState('');
    const [coordenadas, setCoordenadas] = useState<{
        latitude: number;
        longitude: number;
    }>();

    useEffect(() => {
        (async () => {
            try {
                const gpsPermitido = await pedirPermissao();
                if (gpsPermitido) {
                    setCoordenadas(await pegarCoordenadas());
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (coordenadas) {
                    setCepAutomatico(await pegarCep());
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [coordenadas]);

    async function pedirPermissao(): Promise<boolean> {
        try {
            const { granted } =
                await Location.requestForegroundPermissionsAsync();
            return granted;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async function pegarCoordenadas(): Promise<{
        latitude: number;
        longitude: number;
    }> {
        const localizacao = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
        });

        return localizacao.coords;
    }

    async function pegarCep(): Promise<string> {
        if (!coordenadas) return '';

        const endereco = await Location.reverseGeocodeAsync(coordenadas);

        return endereco[0]?.postalCode || '';
    }

    return { cepAutomatico };
}
