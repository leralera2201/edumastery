const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (value) =>
  emailRegex.test(value) ? undefined : 'This email is not valid';

export const minLength = (length) => (value) =>
  value.length >= length
    ? undefined
    : `Field should have min ${length} symbols.`;

export const maxLength = (length) => (value) =>
  value.length <= length
    ? undefined
    : `Field should have max ${length} symbols.`;

export const required = (value) =>
  value.trim() ? undefined : 'Required field';

export const equal = (equalValue, value, name) =>
  value === equalValue ? undefined : `Field should be equal with ${name}`;

export const validateForm = (values, errors) => {
  let isValid = true;
  const newErrors = Object.entries(values).reduce((initial, [name, value]) => {
    const messages = errors[name].validators
      .reduce((acc, validate) => {
        acc.push(validate(value));
        return acc;
      }, [])
      .filter((msg) => !!msg);
    if (messages.length) {
      isValid = false;
    }
    initial[name] = {
      ...errors[name],
      messages,
    };
    return initial;
  }, {});

  return { isValid, newErrors };
};
