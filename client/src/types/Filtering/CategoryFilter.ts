import { FilterAvailable, FilterChanged, StoredFilter } from "./Types";

export interface CategoryFilterProps {
    filterAvailable: FilterAvailable,
    storedFilter: StoredFilter,
    filterChanged: FilterChanged
}