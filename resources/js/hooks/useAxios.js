import { useEffect } from "react"
import axios from "axios"
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { createApp } from "@shopify/app-bridge";

const useAxios = () => {
    // eslint-disable-next-line no-undef
    const app = createApp(shopify.config);
    useEffect(() => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.baseURL = '/api/';

        // Add a request interceptor
        const interceptor = axios.interceptors.request.use(function(config) {
            return getSessionToken(app).then(token => {
                config.headers.Authorization = `Bearer ${token}`;

                return config;
            })
        });

        return () => axios.interceptors.request.eject(interceptor);

    },[]);

    return { axios }
}

export default useAxios;
