
export const getStoredOptions = (storedFilter: { filters: any[]; }) => {
  const storedOptions: any[] = [];
  if (storedFilter && 'filters' in storedFilter) {
    storedFilter.filters.forEach((filter: { value: any; }) => {
      storedOptions.push(filter.value)
    })
  }
  return storedOptions;
}