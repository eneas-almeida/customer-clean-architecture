import { TokenProviderInterface } from './token/contracts';

export * from './token/cognito-token.provider';
export * from './token/vitta-token.provider';

export interface ProvidersInterface {
    token?: TokenProviderInterface;
}
