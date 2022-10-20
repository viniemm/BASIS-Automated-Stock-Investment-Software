export interface Auth {
    token: string,
    isAuthenticated?: boolean,
    isLoading: boolean,
    user: User
}

export interface User {
    id: number,
    username: string,
    email: string
}