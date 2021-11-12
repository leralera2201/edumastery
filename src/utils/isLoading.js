import { ACTION_STATUS } from 'constants';

export const isLoading = (...loadingProps) =>
  loadingProps.some((prop) => prop === ACTION_STATUS.IN_PROGRESS);
