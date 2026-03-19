import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");

const input = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(publicDir, "apple-touch-icon.png");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function removeBackgroundFromEdges({ tolerance = 80 } = {}) {
  return async (data, info) => {
    const out = Buffer.from(data);
    const { width, height, channels } = info;
    if (channels < 4) return { data: out, info };

    const idxOf = (x, y) => (y * width + x) * channels;
    const rgbAt = (x, y) => {
      const idx = idxOf(x, y);
      return [out[idx], out[idx + 1], out[idx + 2]];
    };

    const corners = [
      rgbAt(0, 0),
      rgbAt(width - 1, 0),
      rgbAt(0, height - 1),
      rgbAt(width - 1, height - 1),
    ];

    const ref = corners.reduce(
      (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]],
      [0, 0, 0],
    ).map((v) => Math.round(v / corners.length));

    const closeToRef = (x, y) => {
      const [r, g, b] = rgbAt(x, y);
      const dr = r - ref[0];
      const dg = g - ref[1];
      const db = b - ref[2];
      return dr * dr + dg * dg + db * db <= tolerance * tolerance;
    };

    const visited = new Uint8Array(width * height);
    const qx = new Int32Array(width * height);
    const qy = new Int32Array(width * height);
    let qh = 0;
    let qt = 0;

    const push = (x, y) => {
      const i = y * width + x;
      if (visited[i]) return;
      if (!closeToRef(x, y)) return;
      visited[i] = 1;
      qx[qt] = x;
      qy[qt] = y;
      qt++;
    };

    for (let x = 0; x < width; x++) {
      push(x, 0);
      push(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      push(0, y);
      push(width - 1, y);
    }

    while (qh < qt) {
      const x = qx[qh];
      const y = qy[qh];
      qh++;

      if (x > 0) push(x - 1, y);
      if (x < width - 1) push(x + 1, y);
      if (y > 0) push(x, y - 1);
      if (y < height - 1) push(x, y + 1);
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!visited[y * width + x]) continue;
        const idx = idxOf(x, y);
        out[idx + 3] = 0;
      }
    }

    return { data: out, info };
  };
}

async function main() {
  await ensureDir(publicDir);

  const base = sharp(input)
    .ensureAlpha()
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .raw();

  const { data, info } = await base.toBuffer({ resolveWithObject: true });

  const cleaned = await sharp(data, { raw: info })
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data: d, info: i }) => removeBackgroundFromEdges({ tolerance: 90 })(d, i));

  const cleanedImage = sharp(cleaned.data, { raw: cleaned.info });

  const outputBg = { r: 255, g: 255, b: 255, alpha: 1 };

  // PNG sizes
  await cleanedImage
    .clone()
    .resize(16, 16, { fit: "contain", background: outputBg })
    .flatten({ background: outputBg })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "favicon-16x16.png"));

  await cleanedImage
    .clone()
    .resize(32, 32, { fit: "contain", background: outputBg })
    .flatten({ background: outputBg })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "favicon-32x32.png"));

  await cleanedImage
    .clone()
    .resize(180, 180, { fit: "contain", background: outputBg })
    .flatten({ background: outputBg })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  // Android chrome icons (for manifest)
  await cleanedImage
    .clone()
    .resize(192, 192, { fit: "contain", background: outputBg })
    .flatten({ background: outputBg })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "android-chrome-192x192.png"));

  await cleanedImage
    .clone()
    .resize(512, 512, { fit: "contain", background: outputBg })
    .flatten({ background: outputBg })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "android-chrome-512x512.png"));

  // ICO (multi-size)
  await cleanedImage
    .clone()
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, "_favicon-256.png"));

  // Sharp doesn't write .ico directly; create a simple PNG-based favicon fallback
  // and keep using PNG links in HTML. (Most browsers use the PNG links when present.)
  // If you need a real .ico, regenerate it via favicon generator and drop it in public/favicon.ico.
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

