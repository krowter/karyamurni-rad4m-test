import { Color } from "types";

export const createRandomId = (): string => Math.random().toString();

export const validateColorInput = (color: string) => {
  // valid hex pattern
  // - begins with "#"
  // - has 6 or 3 (in the case of shorthand form) characters
  // - use hexadecimal values 0 to 9 and a to f
  const pattern = /^#([0-9A-F]{3}){1,2}$/i;

  return pattern.test(color);
};

const parseHexColor = (hex: Color["value"]) => {
  let r, g, b;
  if (hex.length === 4) {
    r = hex[1].repeat(2);
    g = hex[2].repeat(2);
    b = hex[3].repeat(2);
  } else {
    r = hex.substr(1, 2);
    g = hex.substr(3, 2);
    b = hex.substr(5, 2);
  }

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  return { r, g, b };
};

export const sortColors = (colors: Color[]) => {
  const compareFunction = (_color1: Color, _color2: Color) => {
    const color1 = parseHexColor(_color1.value);
    const color2 = parseHexColor(_color2.value);

    console.log(color1);
    console.log(color2);
    if (color1.r !== color2.r) return color2.r - color1.r;
    if (color1.g !== color2.g) return color2.g - color1.g;
    return color2.b - color1.b;
  };

  return colors.sort(compareFunction);
};
