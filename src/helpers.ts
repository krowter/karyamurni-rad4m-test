export const createRandomId = (): string => Math.random().toString();

export const validateColorInput = (color: string) => {
  // valid hex pattern
  // - begins with "#"
  // - has 6 or 3 (in the case of shorthand form) characters
  // - use hexadecimal values 0 to 9 and a to f
  const pattern = /^#([0-9A-F]{3}){1,2}$/i;

  return pattern.test(color);
};
