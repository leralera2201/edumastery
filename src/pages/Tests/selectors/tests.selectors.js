import { createSelector } from 'reselect';

const getTestsRootState = (state) => state.testsRoot;

export const getTests = createSelector(
  getTestsRootState,
  ({ data }) => data.items,
);

export const getTestsTotal = createSelector(
  getTestsRootState,
  ({ data }) => data.total,
);

export const getTestsFilter = createSelector(
  getTestsRootState,
  ({ filter }) => filter,
);

export const getTestsStatus = createSelector(
  getTestsRootState,
  ({ status }) => status,
);
