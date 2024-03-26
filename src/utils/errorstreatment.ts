export const getError = (err: any): string => {
  const message = err?.response?.data?.error ?? '';

  if (message) {
    const error = commomErrors.find(e => e.key === message) ?? defaultError;

    return error.value;
  }

  return defaultError.value;
};

const commomErrors = [
  {
    key: 'user not found',
    value: 'Wrong email or password',
  },
  {
    key: 'Missing password',
    value: 'Missing password',
  },
  {
    key: 'Missing email or username',
    value: 'Missing email',
  },
  {
    key: 'Note: Only defined users succeed registration',
    value: 'Email not allowed, please try again.',
  },
];

const defaultError = {
  key: 'default',
  value: 'There was an error, please try again.',
};
