export enum Strategy {
    NOCACHE = 'NOCACHE',
    CACHE = 'CACHE',
}

export type StrategyToken = {
    [key in Strategy]: () => Promise<string | null>;
};
