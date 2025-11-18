export const mergeDeep = (target = {}, source = {}) => {
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (
      Object.prototype.toString.call(source[key]) === "[object Object]" &&
      Object.prototype.toString.call(output[key]) === "[object Object]"
    ) {
      output[key] = mergeDeep(output[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

export const clone = (value) => JSON.parse(JSON.stringify(value ?? {}));
