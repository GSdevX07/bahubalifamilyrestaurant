import sharp from "sharp";

const p = process.argv[2] ?? "public/favicon-32x32.png";
const { data, info } = await sharp(p).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

let min = 255;
let max = 0;
let zeros = 0;
const total = data.length / 4;

for (let i = 3; i < data.length; i += 4) {
  const a = data[i];
  if (a < min) min = a;
  if (a > max) max = a;
  if (a === 0) zeros++;
}

// eslint-disable-next-line no-console
console.log(
  JSON.stringify(
    {
      file: p,
      width: info.width,
      height: info.height,
      minAlpha: min,
      maxAlpha: max,
      transparentPixels: zeros,
      transparentPct: Math.round((zeros / total) * 1000) / 10,
    },
    null,
    2,
  ),
);

