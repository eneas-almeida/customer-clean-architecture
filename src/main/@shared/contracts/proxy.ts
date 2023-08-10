export interface TokenProxyInterface {
    getToken(): Promise<string>;
}

export interface ProxyInterface {
    token?: TokenProxyInterface;
}
