export interface TokenProviderOutputDto {
    access_token: string;
    expires_in: number;
    refresh_expires: number;
    token_type: string;
    'not-before-policy': number;
    scope: string;
    id_token: string;
}

export interface TokenProviderInterface {
    generateToken?(): Promise<TokenProviderOutputDto>;
}
