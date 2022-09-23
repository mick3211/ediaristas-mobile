import {
    CepResponseInterface,
    CidadeInterface,
    EstadoInterface,
} from 'data/@types/EnderecoInterface';
import { ApiService } from './ApiService';

export const LocationService = {
    estados(): EstadoInterface[] {
        return [
            { nome: 'Acre', sigla: 'AC' },
            { nome: 'Alagoas', sigla: 'AL' },
            { nome: 'Amapá', sigla: 'AP' },
            { nome: 'Amazonas', sigla: 'AM' },
            { nome: 'Bahia', sigla: 'BA' },
            { nome: 'Ceará', sigla: 'CE' },
            { nome: 'Distrito Federal', sigla: 'DF' },
            { nome: 'Espírito Santo', sigla: 'ES' },
            { nome: 'Goiás', sigla: 'GO' },
            { nome: 'Maranhão', sigla: 'MA' },
            { nome: 'Mato Grosso', sigla: 'MT' },
            { nome: 'Mato Grosso do Sul', sigla: 'MS' },
            { nome: 'Minas Gerais', sigla: 'MG' },
            { nome: 'Pará', sigla: 'PA' },
            { nome: 'Paraíba', sigla: 'PB' },
            { nome: 'Paraná', sigla: 'PR' },
            { nome: 'Pernambuco', sigla: 'PE' },
            { nome: 'Piauí', sigla: 'PI' },
            { nome: 'Rio de Janeiro', sigla: 'RJ' },
            { nome: 'Rio Grande do Norte', sigla: 'RN' },
            { nome: 'Rio Grande do Sul', sigla: 'RS' },
            { nome: 'Rondônia', sigla: 'RO' },
            { nome: 'Roraima', sigla: 'RR' },
            { nome: 'Santa Catarina', sigla: 'SC' },
            { nome: 'São Paulo', sigla: 'SP' },
            { nome: 'Sergipe', sigla: 'SE' },
            { nome: 'Tocantins', sigla: 'TO' },
        ];
    },

    async cidades(estado: string): Promise<CidadeInterface[] | undefined> {
        try {
            const response = await ApiService.request<
                { nome: string; id: number }[]
            >({
                baseURL:
                    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
                url: `${estado}/municipios`,
            });

            return response.data.map((cidade) => ({
                cidade: cidade.nome,
                codigo_ibge: cidade.id,
            }));
        } catch (e) {
            console.log(e);
        }
    },

    async cep(cep: string): Promise<CepResponseInterface | undefined> {
        try {
            const response = await ApiService.get<CepResponseInterface>(
                'api/enderecos',
                {
                    params: {
                        cep: cep.replace(/\D/g, ''),
                    },
                }
            );

            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
};
