import { createAction } from 'redux-actions';
import { CATEGORIES_ACTION_TYPES } from '../actionTypes/categories.actionTypes';

export const fetchCategoriesStart = createAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.START,
);

export const fetchCategoriesInProgress = createAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.IN_PROGRESS,
);

export const fetchCategoriesSuccess = createAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.SUCCESS,
  (data) => ({ data }),
);

export const fetchCategoriesError = createAction(
  CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.ERROR,
  (error) => error,
);
