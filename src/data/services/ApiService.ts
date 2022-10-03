import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { LocalStorage } from './StorageService';

const url = process.env.NEXT_PUBLIC_API_URL;

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.response.use(
    (resp) => resp,
    (err) => {
        if (
            err.response.status === 401 &&
            err.response.data.code === 'token_not_valid'
        ) {
            handleTokenRefresh(err);
        }
        return Promise.reject(err);
    }
);

async function handleTokenRefresh(err: { config: AxiosRequestConfig }) {
    const tokenRefresh = await LocalStorage.get<string>('token_refresh', '');
    if (tokenRefresh) {
        LocalStorage.clear('token');
        LocalStorage.clear('token_refresh');

        try {
            const { data } = await ApiService.post<{
                access: string;
                refresh: string;
            }>('/auth/token/refresh/', {
                refresh: tokenRefresh,
            });

            LocalStorage.set('token', data.access);
            LocalStorage.set('token_refresh', data.refresh);

            ApiService.defaults.headers.common['Authorization'] =
                'Bearer ' + data.access;

            if (err.config.headers)
                err.config.headers.Authorization =
                    ApiService.defaults.headers.common['Authorization'];

            return ApiService(err.config);
        } catch (e) {
            return err;
        }
    } else {
        return err;
    }
}

export function LinkResolver(
    links: ApiLinksInterface[] = [],
    name: string
): ApiLinksInterface | undefined {
    return links.find((link) => link.rel === name);
}

export function ApiServiceHateoas(
    links: ApiLinksInterface[],
    name: string,
    onCanRequest: (
        request: <T>(data?: AxiosRequestConfig) => Promise<AxiosResponse<T>>
    ) => void,
    onCantRequest?: Function
) {
    const requestLink = LinkResolver(links, name);
    if (requestLink) {
        onCanRequest(<T>(data?: AxiosRequestConfig) => {
            return ApiService.request<T>({
                method: requestLink.type,
                url: requestLink.uri,
                ...data,
            });
        });
    } else {
        onCantRequest?.();
    }
}
