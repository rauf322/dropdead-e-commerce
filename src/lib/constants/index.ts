export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AI Store';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern built-in AI store';
export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';
export const LATEST_PRODUCTS_LIMIT = Number(
  process.env.LATEST_PRODUCTS_LIMIT || 4,
);

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
