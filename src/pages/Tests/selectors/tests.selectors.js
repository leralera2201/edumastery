import { createSelector } from 'reselect';

const getTestsRootState = (state) => state.testsRoot;

export const getTestsState = createSelector(
  getTestsRootState,
  ({ tests }) => tests,
);

export const getCategoriesState = createSelector(
  getTestsRootState,
  ({ categories }) => categories,
);

export const getCategories = createSelector(
  getCategoriesState,
  ({ data }) => data,
);
export const getTests = createSelector(
  getTestsState,
  ({ list }) => list.data.items,
);

export const getCategoriesStatus = createSelector(
  getCategoriesState,
  ({ status }) => status,
);

export const getTestsTotal = createSelector(
  getTestsState,
  ({ list }) => list.data.total,
);

export const getTestsFilter = createSelector(
  getTestsState,
  ({ list }) => list.filter,
);

export const getTestsStatus = createSelector(
  getTestsState,
  ({ list }) => list.status,
);

export const getTestResultStatus = createSelector(
  getTestsState,
  ({ testResult }) => testResult.status,
);
