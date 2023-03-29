import { localCache } from '@/utils/cache';
import { BASE_URL, TIME_OUT } from './config';
import Request from './request';

const request = new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestSuccessFn: (config) => {
            // 携带token
            const token = localCache.getCache('token');
            if (config.headers && token) {
                config.headers!.Authorization = 'Bearer ' + token;
            }

            return config;
        }
    }
});

export default request;
