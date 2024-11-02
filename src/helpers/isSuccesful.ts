/**  A type guard function to check if allSettled results contains a value property and return the generic typing  */
const isSuccessful = <T>(
  response: PromiseSettledResult<T>,
): response is PromiseFulfilledResult<T> => {
  return "value" in response;
};

export default isSuccessful;
