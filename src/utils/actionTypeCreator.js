export const createActionTypes = (actionTypeName) => ({
  START: `${actionTypeName}_START`,
  IN_PROGRESS: `${actionTypeName}_IN_PROGRESS`,
  SUCCESS: `${actionTypeName}_SUCCESS`,
  ERROR: `${actionTypeName}_ERROR`,
  RESET: `${actionTypeName}_RESET`,
});
