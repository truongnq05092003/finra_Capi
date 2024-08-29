import { useAxiosInstance } from "~/api";
import {useAxiosPortalInstance} from "~/api/apiPortal";

export default defineNuxtPlugin(() => {
    const axiosInstance = useAxiosInstance()
    const axiosPortalInstance = useAxiosPortalInstance()
    return {
        provide: {
            axios: axiosInstance,
            axiosP: axiosPortalInstance
        }
    };
});