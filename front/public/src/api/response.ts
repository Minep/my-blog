export interface ApiResponse<T> {
    code: number;
    message: string;
    payload?: T;
}