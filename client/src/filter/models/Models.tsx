import React from "react";
import { ReactNode } from "react";

export interface Filter {
    field: string;
    operator: string;
    value: string;
}

export interface FilterAvailable {
    label: ReactNode;
    field: string;
    options: FilterAvailableOption[];
}

export interface FilterAvailableOption {
    label: string;
    field_value: string;
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
    filterAvailable: FilterAvailable;
    storedFilter: StoredFilter;
    filterChanged: FilterChanged;
}

export type ExtraProps = {
    open: any;
}

export interface Subfilters {
    field: any
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

export interface FilteringProps {

}