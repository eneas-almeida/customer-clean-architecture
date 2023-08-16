import { envs } from '@/main/configs';

const { baseUrl, version, port } = envs.api;

export const api = `${baseUrl}:${port}${version}`;
