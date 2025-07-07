export interface Blog {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    authorUserName: string;
    tags: string[];
    likesCount: number;
    commentsCount: number;
    createdAt: number;
    updatedAt: number;
}

export interface CreateBlogPayload {
    title: string;
    content: string;
}

export interface getBlogsResponse {
    status: boolean;
    message: string;
    data: {
        content: Blog[];
        totalCount: number;
        limit: number;
        page: number;
    };
}
