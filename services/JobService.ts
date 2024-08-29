import type {AxiosInstance} from 'axios';
import type {JobDetailBySlugResponse, JobResponse} from '~/types/JobResponse';

export class JobService {
    private axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async getListJob(): Promise<JobResponse> {
        try {
            const response = await this.axios.get<JobResponse>('/public/job/reviews');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch job list: ${(error as Error).message}`);
        }
    }

    async getJobBySlug(slug: any):Promise<JobDetailBySlugResponse>{
        try {
            const response = await this.axios.get<JobDetailBySlugResponse>(`/public/job/details/${slug}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch job list: ${(error as Error).message}`);
        }
    }

}
