import axios from 'axios';
export const useAxiosPortalInstance = () => {
    const config = useRuntimeConfig();
    const {baseApiPortal} = config.public
    console.log('NUXT_API_BASE', baseApiPortal)
    const axiosPClient = axios.create({
        baseURL: baseApiPortal as string,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: false
    });
    return axiosPClient
};