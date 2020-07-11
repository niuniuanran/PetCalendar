export function bestReadableColour(hex: string) {
  const rgb = hexToRgb(hex);
  const luminance = 0.33 * rgb.r + 0.5 * rgb.g + 0.16 * rgb.b;
  if (luminance > 125) return "#000";
  else return "#fff";
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}
