import axios from 'axios';
export const useAxiosInstance = () => {
    const config = useRuntimeConfig();
    const {baseApiCMSUrl} = config.public
    console.log('NUXT_API_BASE', baseApiCMSUrl)
    const axiosClient = axios.create({
        baseURL: baseApiCMSUrl as string,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: false
    });
    return axiosClient
};