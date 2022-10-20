import { ReactNode } from "react";

export interface FilterAvailable {
    label: ReactNode;
    field: string;
    options: FilterAvailableOption[]
}
export interface Filter {
    field:string,
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