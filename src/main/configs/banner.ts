import { name, version } from '../../../package.json';

export const bannerConfig = () => {
    console.log('----------------------------------------');
    console.log(`${name.toUpperCase()}\nv${version}`);
    console.log('----------------------------------------');
};
