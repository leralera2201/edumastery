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
export const getTests = createSelector(getTestsState, ({ data }) => data.items);

export const getCategoriesStatus = createSelector(
  getCategories,
  ({ status }) => status,
);

export const getTestsTotal = createSelector(
  getTestsState,
  ({ data }) => data.total,
);

export const getTestsFilter = createSelector(
  getTestsState,
  ({ filter }) => filter,
);

export const getTestsStatus = createSelector(
  getTestsState,
  ({ status }) => status,
);
