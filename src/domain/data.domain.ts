export interface SearchResult<T> {
    data: T;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export interface UserData {
    id: string;
    name: string;
    username: string;
    avater: string;
    isFollowing: boolean;
}