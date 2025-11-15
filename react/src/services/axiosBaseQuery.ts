

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axiosInstance';
import { CONFIG } from '../global-config';


export const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers'],
        },
        unknown,
        unknown
    > =>

        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axiosInstance({
                    url: CONFIG.baseURL + url,
                    method,
                    data,
                    params,
                    headers,
                });
                return { data: result?.data };
            } catch (error) {
                console.error('Api error', error);
                const defaultError = {
                    message: 'Internal error',
                    error: 'Internal error',
                    showToUser: false,
                    statusCode: 500,
                };
                return { error: error ?? defaultError };
            }
        };
