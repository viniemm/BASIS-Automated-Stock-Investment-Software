
export const getStoredOptions = (storedFilter) => {
  let storedOptions = [];
  if (storedFilter && 'filters' in storedFilter) {
    storedFilter.filters.forEach((filter) => {
      storedOptions.push(filter.value)
    })
  }
  return storedOptions;
}