import { https } from 'firebase-functions';
import Validator from 'validatorjs';

export const getFirstValidatorError = (errors: Validator.Errors) => {
  const keys = Object.keys(errors.errors);
  return errors.first(keys[0]);
};

export const useValidator = (
  rules: Validator.Rules,
  customMessages?: Validator.ErrorMessages,
) => {
  return (body: any, context: https.CallableContext) => {
    const validation = new Validator(body, rules, customMessages);

    if (validation.fails()) {
      const message = getFirstValidatorError(validation.errors);
      throw new https.HttpsError(
        'invalid-argument',
        message || 'some field is invalid',
        validation.errors.all(),
      );
    }
  };
};
