export type UsernameAction = {
    type: string,
    payload: any
}

// Auth
export interface Auth {
    token: string,
    isAuthenticated?: boolean,
    isLoading: boolean,
    user?: {
        id: number,
        username: string,
        email: string
    }
}

// Portfolio
export interface Portfolio {
    id: string,
    stocks: Stock[]
}

export interface Stock {
    name: string,
    ticker: string,
    weight: number
}

// Filter
import { ReactNode } from "react";

export interface FilterAvailable {
    label: ReactNode;
    field: string;
    options: FilterAvailableOption[]
}
export interface Filter {
    field: string,
    operator: string,
    value: string
}

interface FilterAvailableOption {
    label: string,
    field_value: string
}

export interface StoredFilter {
    filters: StoredFilterSubFilter[]
}

interface StoredFilterSubFilter {
    value: string
}

export interface FilterChanged {
    (filterId?: unknown, filter?: unknown): void;
}

export interface CategoryFilterProps {
    filterAvailable: FilterAvailable,
    storedFilter: StoredFilter,
    filterChanged: FilterChanged
}

// Final State model
export type State = {
    auth: Auth,
    portfolios: Portfolio[]
}

export type RawState = {
    auth: {
        token?: string,
        isAuthenticated?: boolean,
        isLoading: boolean,
        user?: {
            id: number,
            username: string,
            email: string
        }
    },
    error?: {
        msg: string,
        status: any
    },
    message?: any,
    portfolios?: {
        id: string,
        name: string,
        stocks?: {
            name: string,
            ticker: string,
            weight: number
        }[]
    }[]
}

