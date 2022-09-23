import { DiariaInterface } from 'data/@types/DiariaInterface';
import { UserContext } from 'data/contexts/UserContext';
import { useApiHateoas } from 'data/hooks/useApi';
import produce from 'immer';
import { useContext, useEffect, useReducer } from 'react';

export const initialState = {
    diarias: [] as DiariaInterface[],
    isFetching: true,
};

type InitialStateType = typeof initialState;

type DiariaAction = 'SET_DIARIA' | 'SET_FETCHING';

export type DiariaActionType = {
    type: DiariaAction;
    payload?: unknown;
};

export interface DiariaReducerInterface {
    diariaState: InitialStateType;
    diariaDispatch: React.Dispatch<DiariaActionType>;
}

const reducer = (
    state: InitialStateType,
    action: DiariaActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'SET_DIARIA':
                draftState.diarias = action.payload as DiariaInterface[];
                draftState.isFetching = false;
                break;
            case 'SET_FETCHING':
                draftState.isFetching = action.payload as boolean;
                break;
        }
    });

    return nextState;
};

export function UseDiariaReducer(): DiariaReducerInterface {
    const {
        userState: { user },
    } = useContext(UserContext);
    const diarias = useApiHateoas<DiariaInterface[]>(
        user.links,
        'lista_diarias'
    ).data;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (diarias) {
            dispatch({ type: 'SET_DIARIA', payload: diarias });
        }
    }, [diarias]);

    return {
        diariaState: state,
        diariaDispatch: dispatch,
    };
}
