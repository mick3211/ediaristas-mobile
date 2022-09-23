import { ApiLinksInterface } from './ApiLinksInterface';
import { UserInterface } from './UserInterface';

export interface DiariaInterface {
    id?: number;
    links: ApiLinksInterface[];
    cliente: UserInterface;
    diarista: UserInterface;
    data_atendimento: string | Date;
    hora_inicio?: string;
    hora_termino?: string;
    tempo_atendimento: number;
    preco: number;
    logradouro?: string;
    bairro: string;
    complemento: string;
    cep: string;
    cidade: string;
    estado: string;
    numero: string;
    codigo_ibge: number;
    quantidade_quartos: number;
    quantidade_salas: number;
    quantidade_cozinhas: number;
    quantidade_banheiros: number;
    quantidade_quintais: number;
    quantidade_outros: number;
    observacoes?: string;
    servico: number;
    nome_servico: string;
    status?: DiariaStatus;
}

export enum DiariaStatus {
    SEM_PAGAMENTO = 1,
    PAGO = 2,
    CONFIRMADO = 3,
    CONCLUIDO = 4,
    CANCELADO = 5,
    AVALIADO = 6,
    TRANSFERIDO = 7,
}

export type TextColor =
    | 'success'
    | 'error'
    | 'warning'
    | 'primary'
    | 'secondary';
