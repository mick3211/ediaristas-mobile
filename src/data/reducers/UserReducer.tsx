import {
    CidadeInterface,
    EnderecoInterface,
} from 'data/@types/EnderecoInterface';
import {
    ForceUserState,
    UserInterface,
    UserType,
} from 'data/@types/UserInterface';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { LoginService } from 'data/services/LoginService';
import produce from 'immer';
import { useEffect, useReducer } from 'react';

export const initialState = {
    user: {
        nome_completo: '',
        nascimento: '',
        cpf: '',
        email: '',
        foto_usuario: '',
        telefone: '',
        tipo_usuario: UserType.Cliente,
        reputacao: 0,
        chave_pix: '',
    } as UserInterface,
    userAddres: {
        logradouro: '',
        bairro: '',
        complemento: '',
        cep: '',
        cidade: '',
        estado: '',
        numero: '',
    } as EnderecoInterface,
    adressList: [] as CidadeInterface[],
    isLogging: true,
    forceUserState: ForceUserState.none,
};

export type InitialStateType = typeof initialState;
type userAction =
    | 'SET_USER'
    | 'SET_LOGGING'
    | 'SET_ADRESS_LIST'
    | 'SET_USER_ADDRESS'
    | 'SET_FORCE_USER_STATE';
export type UserActionType = {
    type: userAction;
    payload?: unknown;
};
export interface UserReducerInterface {
    userState: InitialStateType;
    userDispacth: React.Dispatch<UserActionType>;
}

const reducer = (
    state: InitialStateType,
    action: UserActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'SET_USER':
                draftState.user = action.payload as UserInterface;
                draftState.isLogging = false;
                break;
            case 'SET_ADRESS_LIST':
                draftState.adressList = action.payload as CidadeInterface[];
                break;
            case 'SET_USER_ADDRESS':
                draftState.userAddres = action.payload as EnderecoInterface;
                break;
            case 'SET_LOGGING':
                draftState.isLogging = action.payload as boolean;
                break;
            case 'SET_FORCE_USER_STATE':
                draftState.forceUserState = action.payload as ForceUserState;
                break;
        }
    });

    return nextState;
};

export function useUserReducer(): UserReducerInterface {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function getUser() {
        try {
            dispatch({ type: 'SET_LOGGING', payload: true });
            const user = await LoginService.getUser();
            if (user) {
                dispatch({ type: 'SET_USER', payload: user });
                if (user.tipo_usuario === UserType.Diarista) {
                    getAddress(user);
                    getAddressList(user);
                }
            } else {
                dispatch({ type: 'SET_LOGGING', payload: false });
            }
        } catch (e) {}
    }

    async function getAddress(user: UserInterface) {
        ApiServiceHateoas(user.links, 'listar_endereco', async (req) => {
            try {
                const response = await req();
                dispatch({ type: 'SET_USER_ADDRESS', payload: response.data });
            } catch (e) {
                console.log(e);
            }
        });
    }

    async function getAddressList(user: UserInterface) {
        ApiServiceHateoas(
            user.links,
            'listar_cidades_atendidas',
            async (req) => {
                try {
                    const response = await req();
                    dispatch({
                        type: 'SET_ADRESS_LIST',
                        payload: response.data,
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        );
    }

    useEffect(() => {
        getUser();
    }, [state.user.id]);

    return {
        userState: state,
        userDispacth: dispatch,
    };
}
