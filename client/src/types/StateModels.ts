import { ReactNode } from "react"; // for FilterAvailable

// once state is fully defined in abstract form,
// the State model will be used for all states of this app

// RawState is the full tree representation of the state

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

export interface User {
    id: number,
    username: string,
    email: string
}

export type UsernameAction = {
    type: string,
    payload: any
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

export interface FilteringState {
    processingRequest: boolean,
    chartType: string,
    errorOpen: boolean,
    error: any,
    reportState: any,
    filtersAvailable: any,
    filterFields: any,
    data: any,
    open?: any
}


export interface FilterAvailableOption {
    label: string,
    field_value: string
}

export interface StoredFilter {
    filters: StoredFilterSubFilter[]
}

export interface StoredFilterSubFilter {
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

// Final State models

// TODO: fully flesh out this type once ready
// Nested abstraction of state, where each component and subcomponent is fully defined
// This is the official representation of the state of the STORE
export type State = {
    auth: Auth,
    portfolios: Portfolio[]
}

// Raw abstraction of app state
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
    filtering?: {
        processingRequest: boolean,
        chartType: string,
        errorOpen: boolean,
        error: any,
        reportState: any,
        filtersAvailable: any,
        filterFields: any,
        data: any,
        open?: any
    }
}

