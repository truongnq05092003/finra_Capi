export interface JobReviewResponse {
    name: string;
    slug: string;
    salary: string;
    address: string;
    endDate: string;
}

export interface JobResponse {
    code: number;
    message: string;
    data: JobReviewResponse[];
}

export interface JobDetail{
    name: string;
    salary: string;
    desc: string;
    department: string;
    slug: string;
    tag: string;
    linkApply: string;
    content: string;
    shortDes: string;
    publishDate: string;
    image:string;
    fileUrl: string;
}

export interface JobDetailBySlugResponse{
    code: number;
    message: string;
    data: JobDetail;
}