import { getJSON } from '@/utils/net';

export interface AppConfig {
    model: string;
    layout: {
        width: number | string;
        height: number | string;
        x: number | string;
        y: number | string;
        top: number | string;
        right: number | string;
        bottom: number | string;
        left: number | string;
    }
}

const configLoading = getJSON('config.json') as Promise<AppConfig>;

export async function getConfig() {
    return configLoading;
}
