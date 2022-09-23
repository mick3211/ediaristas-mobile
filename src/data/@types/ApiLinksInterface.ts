export interface ApiLinksInterface {
    type: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    uri: string;
    rel: string;
}
